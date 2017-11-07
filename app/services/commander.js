import Ember from 'ember';

export default Ember.Service.extend({

    store: Ember.inject.service(),
    game: Ember.inject.service(),

    queue: [],

    animationInProgress: false,

    hero: Ember.computed.readOnly('game.heroPlayer'),

    gameCommands: Ember.computed.readOnly('game.model.gamePhase.gameCommands'),
    phase: Ember.computed.readOnly('game.model.gamePhase'),

    nonResolvedCommands: Ember.computed('gameCommands.isFullfiled', 'gameCommands.[]', 'gameCommands.@each.resolved', function() {
        const gameCommands = this.get('gameCommands');
        return gameCommands && gameCommands.get('isFullfiled') && gameCommands.filterBy('resolved', false);
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

    newCommandReady: Ember.on('init', Ember.observer('nextCommandObject.gameCommandType', function() {
        console.log('newCommandReady: ', this.get('nextCommandObject.gameCommandType'));
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
