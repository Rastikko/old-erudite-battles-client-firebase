import Ember from 'ember';

export default Ember.Route.extend({
    game: Ember.inject.service(),

    model(params) {
        return this.get('store').findRecord('game', params.game_id);
    },

    afterModel(model) {
        this.get('game').set('model', model);
    }
});
