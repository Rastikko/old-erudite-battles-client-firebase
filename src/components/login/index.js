import Component from 'framework/component';

import {TweenLite} from 'gsap';

require('./style.scss');

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

        this.element.querySelector('.login-btn').addEventListener('click', this.loginClickHandler.bind(this));
    }

    /**
     * loginClickHandler.
     */
    loginClickHandler() {
        const loginButton = this.element.querySelector('.login-btn');
        TweenLite.to(loginButton, 1.5, {width: 250});
    }
}

export default LoginComponent;
