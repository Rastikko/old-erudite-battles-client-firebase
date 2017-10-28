import DS from 'ember-data';

export default DS.Model.extend({
    eruditeName: DS.attr('string'),
    baseAttack: DS.attr('number'),
    baseBarrier: DS.attr('number'),
    baseHealth: DS.attr('number'),
    damageTaken: DS.attr('number'),
    energy: DS.attr('number'),
    battleType: DS.attr('string'),
    deckCards: DS.hasMany('card'),
    handCards: DS.hasMany('card'),
    player: DS.belongsTo('player'),
    game: DS.belongsTo('game')
});
