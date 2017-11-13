import Ember from 'ember';

export default Ember.Controller.extend({
    commander: Ember.inject.service(),
    phaser: Ember.inject.service(),

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

    phaseType: Ember.computed('model.gamePhase.gamePhaseType', 'heroPlayer', function() {
        if (!this.get('heroPlayer') || this.get('model.gamePhase.gamePhaseType')) {
            return;
        }
        // this side effect will trigger new automatic commands per phase
        this.get('phaser').setPhase(this.get('model.gamePhase.id'));
        return this.get('model.gamePhase.gamePhaseType');
    })
});
