import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        console.log('model router params!!!', params);
        return this.get('store').findRecord('game', params.game_id);
    },

    afterModel(model) {
        console.log('AFER MODEL!!!!', model);
        console.log('AFER MODEL game players!!!!', model.get('gamePlayers'));
        console.log('AFER MODEL game players!!!!', model.get('gamePlayers.gameErudites'));
        console.log('AFER MODEL game players!!!!', model.get('gamePlayers.gameErudites.0'));
        console.log('AFER MODEL game players!!!!', model.get('gamePlayers.gameErudites.1'));
    }
});
