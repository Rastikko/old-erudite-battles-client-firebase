import Ember from 'ember';

export default Ember.Service.extend({

    store: Ember.inject.service(),
    game: Ember.inject.service(),

    queue: [],

    animationInProgress: false,

    hero: Ember.computed.readOnly('game.heroPlayer'),

    // we should create a phaser service to handle this kind of stuff
    phaseType: Ember.computed('game.phaseType', function() {
        const phaseType = this.get('game.phaseType');

        if (phaseType === 'INITIAL_DRAW' && this._previousPhase !== phaseType) {
            this.enqueueCommand('DRAW_CARD');
            // check if we already have draw any cards in the phaseType.
            // wait until the last card was resolved
            // once enough cards has been resolved then finish phaseType.
            this._previousPhase = phaseType;
        }
        return phaseType;
    }),

    phase: Ember.computed.readOnly('game.model.gamePhase'),

    nonResolvedCommands: Ember.computed('game.model.gamePhase.gameCommands.[]', 'game.model.gamePhase.gameCommands.@each.resolved', function() {
        const gameCommands = this.get('game.model.gamePhase.gameCommands');
        return gameCommands && gameCommands.filterBy('resolved', false);
    }),

    waitigToResolveCommand: Ember.computed.gt('nonResolvedCommands.length', 0),

    nexCommand: Ember.computed('queue.[]', 'waitigToResolveCommand', function() {
        const queue = this.get('queue');
        const waitigToResolveCommand = this.get('waitigToResolveCommand');

        // TODO:
        // Check if there is an unresolved command
        // Check if there is a resolved unique commandvc
        if (queue && queue[0] && !waitigToResolveCommand) {
            return queue && queue[0];
        }
    }),

    nextCommandObject: Ember.computed('nexCommand', 'game', 'hero', 'phase', 'animationInProgress', function() {
        const nexCommand = this.get('nexCommand');
        const game = this.get('game.model');
        const phase = this.get('phase');
        const hero = this.get('hero');
        const animationInProgress = this.get('animationInProgress');

        if(nexCommand && game && phase && hero && !animationInProgress) {
            return {
                gameCommandType: nexCommand,
                resolved: false,
                gamePhase: phase,
                gamePlayer: hero,
                game: game,
            }
        }
    }),

    newCommandReady: Ember.on('init', Ember.observer('nextCommandObject', function() {
        // this.get('nextCommandObject');
        if (this.get('nextCommandObject')) {
            Ember.run.throttle(this, this.checkAndTriggerNextCommand, 100);
        }
    })),

    checkAndTriggerNextCommand: function() {
        const gamePhasePromise = this.get('store').findRecord('gamePhase', this.get('nextCommandObject.gamePhase.id'));
        const nextCommandObject = this.get('nextCommandObject');
        gamePhasePromise.then(gamePhase => {
            this.createCommand(nextCommandObject, gamePhase);
        });
        this.get('queue').removeAt(0);

    },

    enqueueCommand: function(commandType) {
        this.get('queue').pushObject(commandType);
    },

    createCommand: function(commandObject, gamePhase) {
        const newCommand = this.get('store').createRecord('gameCommand', commandObject);
        gamePhase.get('gameCommands').addObject(newCommand);

        newCommand.save().then(() => {
            gamePhase.save();
        });
    }
});
