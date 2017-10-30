import DS from 'ember-data';

export default DS.Model.extend({
    gamePhaseType: DS.attr('string'),
    gameCommands: DS.hasMany('game-command'),
    game: DS.belongsTo('game')
});
