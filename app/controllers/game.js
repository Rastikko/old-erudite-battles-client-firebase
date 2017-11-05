import Ember from 'ember';

export default Ember.Controller.extend({
    game: Ember.inject.service(),
    commander: Ember.inject.service(),

    onInit: Ember.on('init', function() {
        this.get('commander');
    })
});
