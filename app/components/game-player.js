import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['game-player-component'],
    imagePath: '/assets/images/player-avatar-placeholder.jpg',

    avatarBackgroundStyle: Ember.computed('imagePath', function() {
        // TODO: perhaps escape css
        return `background-image: url('${this.get('imagePath')}')`;
    })
});
