import DS from 'ember-data';

export default DS.Model.extend({
    eruditeName: DS.attr('string'),
    attack: DS.attr('number'),
    barrier: DS.attr('number'),
    totalHealth: DS.attr('number'),
    health: DS.attr('number'),
    energy: DS.attr('number'),
    battleType: DS.attr('string'),
    deckCards: DS.hasMany('card'),
    handCards: DS.hasMany('card'),
    player: DS.belongsTo('player'),
    // TODO: investigate why adding this reference breaks the data
    // game: DS.belongsTo('game')
});
