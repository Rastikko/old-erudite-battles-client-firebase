import Ember from 'ember';

export default Ember.Controller.extend({
    gamePlayers: Ember.computed.readOnly('model.gamePlayers', function() {
        return this.get('model.gamePlayers');
    }),

    enemyPlayer: Ember.computed.filter('model.gamePlayers.@each.player', function() {
        const gamePlayers = this.get('model.gamePlayers');

        return gamePlayers.find((gamePlayer) => {
            return gamePlayer.get('player.id') !== this.get('session.currentUser.uid');
        });
    }),

    heroPlayer: Ember.computed.filter('model.gamePlayers.@each.player', function() {
        const gamePlayers = this.get('model.gamePlayers');

        return gamePlayers.find((gamePlayer) => {
            return gamePlayer.get('player.id') === this.get('session.currentUser.uid');
        });
    })


});
