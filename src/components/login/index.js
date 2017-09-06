import Component from 'framework/component';

import {TweenLite} from 'gsap';

require('./style.styl');

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

        this.element.querySelector('.login-button').addEventListener('click', this.loginClickHandler.bind(this));
    }

    /**
     * loginClickHandler.
     */
    loginClickHandler() {
        const loginButton = this.element.querySelector('.login-button');
        TweenLite.to(loginButton, 1.5, {scale: 0.25});
    }
}

export default LoginComponent;
