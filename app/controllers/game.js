import Ember from 'ember';

export default Ember.Controller.extend({
    enemyPlayer: Ember.computed('model.gamePlayers.@each.player', function() {
        const gamePlayers = this.get('model.gamePlayers');
        console.log('gamePlayers', gamePlayers);
        console.log('gamePlayers', gamePlayers);

        const enemy = gamePlayers.find((gamePlayer) => {
            console.log('gamePlayer', gamePlayer);
            console.log('gamePlayer.player', gamePlayer.get('player'));
            console.log('gamePlayer.player.id', gamePlayer.get('player.id'));
            const playerId = gamePlayer.get('player.id');
            return playerId && playerId !== this.get('session.currentUser.uid');
        });

        console.log('enemy', enemy);

        return enemy;
    }),

    heroPlayer: Ember.computed('model.gamePlayers.@each.player', function() {
        const gamePlayers = this.get('model.gamePlayers');

        return gamePlayers.find((gamePlayer) => {
            return gamePlayer.get('player.id') === this.get('session.currentUser.uid');
        });
    })


});
