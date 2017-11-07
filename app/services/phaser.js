import Ember from 'ember';

export default Ember.Service.extend({

    store: Ember.inject.service(),
    game: Ember.inject.service(),
    commander: Ember.inject.service(),

    // we should create a phaser service to handle this kind of stuff
    phaseType: Ember.computed('game.phaseType', 'game.model.gamePhase.id', function() {
        const gamePhaseId = this.get('game.model.gamePhase.id');
        const phaseType = this.get('game.phaseType');

        if (!gamePhaseId) {
            return;
        }

        return phaseType;
    }),

    onPhaseChange: Ember.on('init', Ember.observer('phaseType', function() {
        // this.get('nextCommandObject');
        const phaseType = this.get('phaseType');
        if (phaseType !== this._previousPhaseType) {
            this.handleNewPhaseType(phaseType)
            this._previousPhaseType = phaseType;
        }
    })),

    getPhaseCommandsPromise: function(gamePhaseId) {
        const gamePhasePromise = this.get('store').findRecord('gamePhase', gamePhaseId);

        return gamePhasePromise.then(gamePhase => {
            const gameCommandsPromises = gamePhase.get('gameCommands').map(gameCommand => {
                return this.get('store').findRecord('gameCommand', gameCommand.get('id'));
            });
            /*eslint no-undef: "off"*/
            return Promise.all(gameCommandsPromises);
        });
    },

    isCommandNotDispatched: function(gameCommandType) {
        const gameCommandsPromises = this.getPhaseCommandsPromise(this.get('game.model.gamePhase.id'));

        return gameCommandsPromises.then(gameCommands => {
            gameCommands.forEach(gameCommand => {
                // TODO: get only the ones from the player
                if (gameCommandType === gameCommand.get('gameCommandType')) {
                    throw 'The command was already dispatched';
                }
            })
        });
    },

    dispatchNewCommand(gameCommandType) {
        this.isCommandNotDispatched(gameCommandType).then(() => {
            this.get('commander').enqueueCommand(gameCommandType);
        });
    },

    handleNewPhaseType: function(phaseType) {
        if (phaseType === 'INITIAL_DRAW') {
            this.dispatchNewCommand('DRAW_CARD');
            this.dispatchNewCommand('END_PHASE');
        }

        if (phaseType === 'GATHER_RESOURCE') {
            this.dispatchNewCommand('GATHER_RESOURCE');
            this.dispatchNewCommand('END_PHASE');
        }
    }

});
