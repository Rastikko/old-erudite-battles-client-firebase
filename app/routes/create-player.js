import Ember from 'ember';

export default Ember.Route.extend({

    isCreating: false,

    createNewPlayer: function(data) {
        const newPlayer = this.store.createRecord('player', {
            id: this.get('session.currentUser.uid'),
            username: data.username,
            state: 'NONE'
        });
        return newPlayer.save();
    },

    actions: {
        createPlayer: function(username) {
            // TODO: handle errors and loading
            this
                .createNewPlayer({username})
                .then(() => this.transitionTo('index'));
        }
    }
});
