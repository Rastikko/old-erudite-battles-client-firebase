import DS from 'ember-data';

export default DS.Model.extend({
    gameCommandType: DS.attr('string'),
    resolved: DS.attr('boolean'),
    gamePlayer: DS.belongsTo('game-player'),
    gamePhase: DS.belongsTo('game-phase'),
    game: DS.belongsTo('game')
});
