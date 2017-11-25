import Ember from 'ember';

export default Ember.Service.extend({

    store: Ember.inject.service(),
    commander: Ember.inject.service(),
    phaseId: null,
    gamePlayer: null,

    setPhase(phaseId, gamePlayer) {
        debugger;
        if (this.phaseId === phaseId) {
            return;
        }

        this.phaseId = phaseId;
        this.gamePlayer = gamePlayer;
        this._handleNewPhase(phaseId);
    },

    _handleNewPhase(phaseId) {
        this._getPhaseAndCommandsPromise(phaseId).then((phaseAndCommands) => {
            if (phaseAndCommands.gamePhase.get('gamePhaseType') === 'INITIAL_DRAW') {
                this._dispatchNewCommand('DRAW_CARD', phaseAndCommands);
                this._dispatchNewCommand('END_PHASE', phaseAndCommands);
            }


            if (phaseAndCommands.gamePhase.get('gamePhaseType') === 'GATHER') {
                this._dispatchNewCommand('GATHER_ENERGY', phaseAndCommands);
                this._dispatchNewCommand('END_PHASE', phaseAndCommands);
            }

        });
    },

    _getPhaseAndCommandsPromise(gamePhaseId) {
        const gamePhasePromise = this.get('store').findRecord('gamePhase', gamePhaseId);

        return gamePhasePromise.then(gamePhase => {
            const gameCommandsPromises = gamePhase.get('gameCommands')
                .map(gameCommand =>  this.get('store').findRecord('gameCommand', gameCommand.get('id')));
            return Promise.all(gameCommandsPromises).then(gameCommands => {
                return {gamePhase, gameCommands}
            });
        });
    },

    _dispatchNewCommand(commandType, phaseAndCommands) {
        const {gamePhase, gameCommands} = phaseAndCommands;

        const playersCommands = gameCommands.filter(command => command.get('gamePlayer.id') === this.gamePlayer.get('id'));
        const dispatchedCommandTypes = playersCommands.map(command => command.get('gameCommandType'));
        const commandAlreadyDispatched = dispatchedCommandTypes.includes(commandType);

        if (commandAlreadyDispatched) {
            return;
        }

        this.get('commander').enqueueCommand({
            gameCommandType: commandType,
            gamePhase: gamePhase,
            game: gamePhase.get('game'),
            gamePlayer: this.gamePlayer,
            resolved: false
        });
    }
});
