import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['game-erudite-component', 'card', 'card text-center'],

    eruditeName: Ember.computed.readOnly('gamePlayer.eruditeName'),

    gamePlayerAttributeType: Ember.computed('gamePlayer.battleType', function() {
        const battleType = this.get('gamePlayer.battleType');

        if (battleType === 'FACTORIZATION') {
            return 'attribute-factorization';
        }
    }),

    attack: Ember.computed.readOnly('gamePlayer.attack'),
    barrier: Ember.computed.readOnly('gamePlayer.barrier'),

    health: Ember.computed.readOnly('gamePlayer.health'),
    totalHealth: Ember.computed.readOnly('gamePlayer.totalHealth'),

    healthRemaining: Ember.computed('health', 'totalHealth', function() {
        return this.get('totalHealth') - this.get('health');
    })
});
