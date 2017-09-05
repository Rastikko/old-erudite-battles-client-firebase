import Component from 'framework/component';
import LoginComponent from 'components/login';

require('./style.styl');

/** Class that handles login component functionality. */
class GameComponent extends Component {
    /**
     * Constructor.
     */
    constructor() {
        super({
            template: require('./template.handlebars'),
            className: 'erudite-battles-game-component',
        });

        this.element.classList.add('game-container');

        const loginComponent = new LoginComponent();
        this.element.querySelector('.displayed-view').appendChild(loginComponent.element);
    }
}

export default GameComponent;
