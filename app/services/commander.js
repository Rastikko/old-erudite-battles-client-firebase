import Ember from 'ember';

export default Ember.Service.extend({

    store: Ember.inject.service(),

    currentCommandInProgress: null,
    gamePlayer: null,
    queue: [],

    enqueueCommand(command) {
        this.gamePLayer = command.gamePLayer;
        this.queue.push(command);
        if (this.queue.length === 1) {
            this._processQueue();
        }
    },

    _processQueue() {
        const dequeueCommand = this._dequeueNextCommand.bind(this);
        this._checkCommands().then(dequeueCommand);
    },

    _dequeueNextCommand() {
        const nextCommand = this.queue.shift();
        nextCommand && this._createCommand(nextCommand)
    },

    _checkCommands() {
        if (this.currentCommandInProgress) {
            return Promise.reject('Command already in progress');
        }
        // TODO: check if there is some unresolved command hanging there
        return Promise.resolve();
    },

    _checkCommandInProgress() {
        Ember.run.later(this, () => {
            const commandPromise = this.get('store').findRecord('gameCommand', this.currentCommandInProgress);
            commandPromise.then(command => {
                if (command.get('resolved')) {
                    this.currentCommandInProgress = null,
                    this._processQueue();
                } else {
                    this._checkCommandInProgress();
                }
            });
        }, 100);
    },

    _createCommand: function(command) {
        const newCommand = this.get('store').createRecord('gameCommand', command);
        command.gamePhase.get('gameCommands').addObject(newCommand);

        newCommand.save().then(() => {
            command.gamePhase.save();
        });

        this.currentCommandInProgress = newCommand.get('id');
        this._checkCommandInProgress();
    }
});
