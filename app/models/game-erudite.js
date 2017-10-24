import DS from 'ember-data';

export default DS.Model.extend({
    isMainErudite: DS.attr('boolean'),
    health: DS.attr('number'),
    healthRemaining: DS.attr('number'),
    attack: DS.attr('number')
});
