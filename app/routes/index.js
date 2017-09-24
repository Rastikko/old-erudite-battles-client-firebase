import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function() {
        if (this.get('session.currentUser.uid')) {
          // TODO: go to lobby
        } else {
          this.transitionTo('login');
        }
    },
    actions: {
        findMatch: function() {
            this.transitionTo('game');
        }
    }
});
