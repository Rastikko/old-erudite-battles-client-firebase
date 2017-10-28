import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game/player-erudite-barrier', 'Integration | Component | game/player erudite barrier', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{game/player-erudite-barrier}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#game/player-erudite-barrier}}
      template block text
    {{/game/player-erudite-barrier}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
