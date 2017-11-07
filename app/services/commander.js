import Ember from 'ember';

export default Ember.Service.extend({

    store: Ember.inject.service(),
    game: Ember.inject.service(),

    queue: [],
    previousCommand: null,

    waitingForPreviousCommand: Ember.computed('previousCommand', 'previousCommand.resolved', function() {
        if (!this.get('previousCommand') || this.get('previousCommand.resolved')) {
            return false;
        }
        return true;
    }),

    nexCommand: Ember.computed('queue.[]', 'waitingForPreviousCommand', function() {
        if (this.get('queue.length') && !this.get('waitingForPreviousCommand')) {
            return this.get('queue.0')
        }
    }),

    newCommandReady: Ember.on('init', Ember.observer('nexCommand', function() {
        const nextCommand = this.get('nexCommand');
        if (nextCommand) {
            this.checkAndTriggerNextCommand(nextCommand);
            this.set('previousCommand', { resolve: false });
        }
    })),

    enqueueCommand: function(command) {
        // console.log('enqueueCommand command: ', command);
        this.get('queue').pushObject(command);
    },

    checkAndTriggerNextCommand: function(command) {
        const gamePhasePromise = this.get('store').findRecord('gamePhase', command.gamePhase.get('id'));
        gamePhasePromise.then(gamePhase => {
            this.createCommand(command, gamePhase);
        });
    },

    createCommand: function(command, gamePhase) {
        const newCommand = this.get('store').createRecord('gameCommand', command);
        gamePhase.get('gameCommands').addObject(newCommand);

        newCommand.save().then(() => {
            gamePhase.save();
        });

        this.set('previousCommand', newCommand);
        this.get('queue').removeAt(0);
    }
});
