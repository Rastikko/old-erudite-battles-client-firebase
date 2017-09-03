import Component from 'component';

/** Class that handles login component functionality. */
class LoginComponent extends Component {
    /**
     * Constructor.
     */
    constructor() {
        const model = {name: 'Johan'};
        super({
            template: require('./template.handlebars'),
            className: 'erudite-battles-login-component',
            model: model,
        });
    }
}

export default LoginComponent;
