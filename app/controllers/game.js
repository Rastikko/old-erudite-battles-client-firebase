import Ember from 'ember';

export default Ember.Controller.extend({
    gamePlayers: Ember.computed.readOnly('model.gamePlayers', function() {
        return this.get('model.gamePlayers');
    }),


});
