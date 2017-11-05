import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['game-navigation-component'],

    playerName: Ember.computed.readOnly('gamePlayer.player.username'),
    deckCards: Ember.computed.readOnly('gamePlayer.deckCards'),
    energy: Ember.computed.readOnly('gamePlayer.energy')

});
