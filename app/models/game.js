import DS from 'ember-data';

export default DS.Model.extend({
    gamePlayers: DS.hasMany('game-player')
});