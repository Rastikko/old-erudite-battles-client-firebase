import DS from 'ember-data';

export default DS.Model.extend({
    username: DS.attr('string'),
    state: DS.attr('string'),
    game: DS.belongsTo('game')
});
