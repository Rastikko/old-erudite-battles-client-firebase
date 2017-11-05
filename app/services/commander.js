import Ember from 'ember';

export default Ember.Service.extend({

    store: Ember.inject.service(),
    game: Ember.inject.service(),

    queue: [],

    _previousPhase: '',

    hero: Ember.computed.readOnly('game.heroPlayer'),

    phase: Ember.computed('game.phaseType', function() {
        const phase = this.get('game.phaseType');

        if (phase === 'INITIAL_DRAW' && this.get('_previousPhase') !== 'phase') {
            this.enqueueCommand('DRAW_CARD');
            // this.enqueueCommand('END_PHASE');
            // check if we already have draw any cards in the phase.
            // wait until the last card was resolved
            // once enough cards has been resolved then finish phase.
            this.set('_previousPhase', phase);
        }
        return phase;
    }),

    nextCommandObject: Ember.computed('queue.[]', 'game', 'hero', 'phase', function() {
        const queue = this.get('queue');
        const game = this.get('game.model');
        const phase = this.get('phase');
        const hero = this.get('hero');

        if(queue && queue[0] && game && phase && hero) {
            return {
                gameCommandType: queue[0],
                gamePhase: phase,
                gamePlayer: hero,
                game: game,
            }
        }
    }),

    newCommandReady: Ember.on('init', Ember.observer('nextCommandObject', function() {
        if (this.get('nextCommandObject')) {
            this.createCommand(this.get('nextCommandObject'));
        }
    })),

    createCommand: function(commandObject) {
        const newCommand = this.get('store').createRecord('gameCommand', commandObject);
        newCommand.save().then(() => {
            this.get('queue').removeObject(this.get('queue.0'));
        });
    }
});
