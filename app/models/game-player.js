import DS from 'ember-data';

export default DS.Model.extend({
    deckCards: DS.hasMany('card'),
    handCards: DS.hasMany('card'),
    gameErudites: DS.hasMany('game-erudite'),
    energy: DS.attr('number'),
    player: DS.belongsTo('player'),
    game: DS.belongsTo('game')
});
