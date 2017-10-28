import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'nav',
    classNames: ['game-player-navigation-component', 'navbar', 'navbar-toggleable-sm', 'navbar-inverse', 'bg-inverse'],

    playerName: Ember.computed.readOnly('gamePlayer.player.username'),
    deckCards: Ember.computed('gamePlayer.deckCards', function() {
        return this.get('gamePlayer.deckCards');
    }),
    energy: Ember.computed.readOnly('gamePlayer.energy')
});
