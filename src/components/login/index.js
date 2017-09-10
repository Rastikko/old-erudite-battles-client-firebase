import {auth} from 'services/auth';
import Component from 'framework/component';

import {TweenLite} from 'gsap';

require('./style.styl');

/** Class that handles login component functionality. */
class LoginComponent extends Component {
    /**
     * Constructor.
     */
    constructor() {
        super({
            template: require('./template.handlebars'),
            className: 'erudite-battles-login-component',
        });

        const loginButton = this.element.querySelector('.login-button');
        loginButton.addEventListener('click', this.loginClickHandler.bind(this));
    }

    /**
     * loginClickHandler.
     */
    loginClickHandler() {
        auth.anonymousAuthentication();
    }

    /**
        Will start transitioning to the next screen
        @return {Promise}
    */
    destroy() {
        return new Promise((resolve) => {
            const logo = this.element.querySelector('.login-logo');
            TweenLite.to(logo, 0.5, {scale: 0.8}).eventCallback('onComplete', resolve);
            this.isDestroyed = true;
        });
    }
}

export default LoginComponent;
