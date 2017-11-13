import Ember from 'ember';

export default Ember.Service.extend({

    store: Ember.inject.service(),
    commander: Ember.inject.service(),
    phaseId: null,
    gamePlayer: null,

    // we should create a phaser service to handle this kind of stuff
    // phaseType: Ember.computed.readOnly('game.phaseType'),

    setPhase: function(phaseId, gamePlayer) {
        if (this.phaseId === phaseId) {
            return;
        }
        this.phaseId = phaseId;
        this.gamePlayer = gamePlayer;
        this._handleNewPhase(phaseId);
    },

    _handleNewPhase: function(phaseId) {
        this._getPhaseAndCommandsPromise(phaseId).then((phaseAndCommands) => {
            console.log('phaseAndCommands', phaseAndCommands);
            console.log('gamePhaseType', phaseAndCommands.phase.get('gamePhaseType') );

            if (phaseAndCommands.phase.get('gamePhaseType') === 'INITIAL_DRAW') {
                this._dispatchNewCommand('DRAW_CARD', phaseAndCommands);
                this._dispatchNewCommand('END_PHASE', phaseAndCommands);
            }

            // if (phaseType === 'GATHER_RESOURCE') {
            //     this.dispatchNewCommand('GATHER_RESOURCE');
            //     this.dispatchNewCommand('END_PHASE');
            // }

        });
    },

    _dispatchNewCommand(commandType, phaseAndCommands) {
        const dispatchedCommandTypes = phaseAndCommands.commands.map(command => command.get('gameCommandType'));
        const commandAlreadyDispatched = dispatchedCommandTypes.includes(commandType);
        if (commandAlreadyDispatched) {
            return;
        }
        this.get('commander').enqueueCommand({
            gameCommandType: commandType,
            gamePhase: phaseAndCommands.phase,
            resolved: false,
            game: phaseAndCommands.phase.get('game'),
            gamePlayer: this.gamePlayer
        });
    },

    _getPhaseAndCommandsPromise: function(gamePhaseId) {
        const gamePhasePromise = this.get('store').findRecord('gamePhase', gamePhaseId);

        return gamePhasePromise.then(gamePhase => {
            const gameCommandsPromises = gamePhase.get('gameCommands').map(gameCommand => {
                return this.get('store').findRecord('gameCommand', gameCommand.get('id'));
            });
            /*eslint no-undef: "off"*/
            return Promise.all(gameCommandsPromises).then(gameCommands => {
                return {
                    phase: gamePhase,
                    commands: gameCommands
                };
            });
        });
    }
});
