import Ember from 'ember';

const NONE_STATE = 'NONE';
const FIND_MATCH_STATE = 'FIND_MATCH_VS_BOT';
const IN_GAME_STATE = 'IN_GAME';

export default Ember.Controller.extend({
    noneState: Ember.computed.equal('model.state', NONE_STATE),
    findMatchState: Ember.computed.equal('model.state', FIND_MATCH_STATE),
    inGameState: Ember.computed('model.state', 'model.game.id', function() {
        // it will side effect a transition to game
        if (this.get('model.state') === IN_GAME_STATE && this.get('model.game.id')) {
            this.transitionToRoute('game', this.get('model.game.id'));
            return true;
        }
        return false;
    }),
    actions: {
        findMatch: function() {
            const model = this.get('model');
            model.set('state', FIND_MATCH_STATE);
            model.save();
        }
    }
});
