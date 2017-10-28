import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game/player-cards', 'Integration | Component | game/player cards', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{game/player-cards}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#game/player-cards}}
      template block text
    {{/game/player-cards}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
