import Ember from 'ember';

export default Ember.Route.extend({
    userId: Ember.computed.readOnly('session.currentUser.uid'),

    beforeModel: function() {
        if (this.get('session.currentUser.uid')) {
          return this.checkAndTransitionToPlayerCreation();
        }
        this.transitionTo('login');
    },

    model: function() {
        return this.store.findRecord('player', this.get('userId'));
    },

    checkAndTransitionToPlayerCreation() {
        return this.store
            .findRecord('player', this.get('userId'))
            .catch(() => this.transitionTo('create-player'));
    }
});
