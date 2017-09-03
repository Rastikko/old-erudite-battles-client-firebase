import Component from 'component';

require('./style.scss');

/** Class that handles login component functionality. */
class LoginComponent extends Component {
    /**
     * Constructor.
     */
    constructor() {
        super({
            template: require('./template.handlebars'),
            className: 'erudite-battles-game-component',
        });
    }
}

export default LoginComponent;
