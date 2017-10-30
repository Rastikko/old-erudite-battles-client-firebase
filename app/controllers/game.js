import Ember from 'ember';

export default Ember.Controller.extend({
    commander: Ember.inject.service(),

    _oldGamePhaseType: "",
    _oldHeroPlayer: null,

    enemyPlayer: Ember.computed('model.gamePlayers.@each.player', function() {
        const gamePlayers = this.get('model.gamePlayers');

        return gamePlayers.find((gamePlayer) => {
            const playerId = gamePlayer.get('player.id');
            return playerId && playerId !== this.get('session.currentUser.uid');
        });
    }),

    heroPlayer: Ember.computed('model.gamePlayers.@each.player', function() {
        const gamePlayers = this.get('model.gamePlayers');

        const heroPlayer = gamePlayers.find((gamePlayer) => {
            return gamePlayer.get('player.id') === this.get('session.currentUser.uid');
        });

        if (heroPlayer && heroPlayer !== this.get('_oldHeroPlayer')) {
            this.get('commander').setHeroGamePlayer(heroPlayer);
            this.set('_oldHeroPlayer', heroPlayer);
        }

        return heroPlayer;
    }),

    phaseType: Ember.computed('model.gamePhase.gamePhaseType', function() {

        const phaseType = this.get('model.gamePhase.gamePhaseType');

        if (phaseType && phaseType !== this.get('_oldGamePhaseType')) {
            this.get('commander').setPhase(this.get('model.gamePhase.gamePhaseType'));
            this.set('_oldGamePhaseType', phaseType);
        }
        return this.get('model.gamePhase.gamePhaseType');
    }),


});
