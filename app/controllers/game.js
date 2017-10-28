import Ember from 'ember';

export default Ember.Controller.extend({
    enemyPlayer: Ember.computed('model.gamePlayers.@each.player', function() {
        const gamePlayers = this.get('model.gamePlayers');

        return gamePlayers.find((gamePlayer) => {
            return gamePlayer.get('player.id') !== this.get('session.currentUser.uid');
        });
    }),

    heroPlayer: Ember.computed('model.gamePlayers.@each.player', function() {
        const gamePlayers = this.get('model.gamePlayers');

        return gamePlayers.find((gamePlayer) => {
            return gamePlayer.get('player.id') === this.get('session.currentUser.uid');
        });
    })


});
