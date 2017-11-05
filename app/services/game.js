import Ember from 'ember';

export default Ember.Service.extend({

    session: Ember.inject.service(),

    enemyPlayer: Ember.computed('model.gamePlayers.@each.player', function() {
        const gamePlayers = this.get('model.gamePlayers');

        return gamePlayers && gamePlayers.find((gamePlayer) => {
            const playerId = gamePlayer.get('player.id');
            return playerId && playerId !== this.get('session.currentUser.uid');
        });
    }),

    heroPlayer: Ember.computed('model.gamePlayers.@each.player', function() {
        const gamePlayers = this.get('model.gamePlayers');

        return gamePlayers && gamePlayers.find((gamePlayer) => {
            return gamePlayer.get('player.id') === this.get('session.currentUser.uid');
        });
    }),

    phaseType: Ember.computed.readOnly('model.gamePhase.gamePhaseType'),

});
