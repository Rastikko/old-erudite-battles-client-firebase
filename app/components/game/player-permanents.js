import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['game-player-permanents-component', 'row', 'justify-content-md-center'],
    classNameBindings: ['isHero:is-hero:is-enemy'],

    totalAttack: Ember.computed('gamePlayer.baseAttack', function() {
        return this.get('gamePlayer.baseAttack');
    })
});
