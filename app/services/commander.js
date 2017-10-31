import Ember from 'ember';

export default Ember.Service.extend({

    store: Ember.inject.service(),

    game: null,
    phase: null,
    hero: null,
    currentCommand: null,

    queue: [],

    // TODO: maybe instead of set and rely on controller we can fetch from store directly

    setPhase: function(phase) {
        // TODO manage the full phase
        if (phase.get('gamePhaseType') === 'INITIAL_DRAW') {
            this.enqueueCommand('DRAW_CARD');
            this.enqueueCommand('END_PHASE');
            // check if we already have draw any cards in the phase.
            // wait until the last card was resolved
            // once enough cards has been resolved then finish phase.
        }
        this.set('phase', phase);
    },

    setHeroGamePlayer: function(hero) {
        this.set('hero', hero)
    },

    setGame: function(game) {
        this.set('game', game);
    },

    enqueueCommand: function(command) {
        this.queue.push(command);
    },

    nextCommandObject: Ember.computed('queue.[]', 'game', 'hero', 'phase', function() {
        const queue = this.get('queue');
        const game = this.get('game');
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

    // TODO: create game service and observe the right properties to trigger a checkAndCreateCommand method
    createCommand: function(commandObject) {
        const newCommand = this.get('store').createRecord('gameCommand', commandObject);
        newCommand.save().then(() => {
            this.get('queue').removeObject(this.get('queue.0'));
        });
    }
});
