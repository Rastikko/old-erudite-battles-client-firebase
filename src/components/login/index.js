const loginTemplate = require('./template.handlebars');

/** Class that handles login component functionality. */
class LoginComponentManager {
    /**
     * Constructor.
     */
    constructor() {
        this.className = 'eb-login-component';
    }
    /**
     * Defines the parent element, is required for render.
     * @param {domNode} domElement - The x value.
     */
    setParent(domElement) {
        this.parent = domElement;
    }

    /**
     * Adds the template to the parent.
     */
    render() {
        const loginComponent = document.createElement('div');
        loginComponent.classList.add(this.className);
        loginComponent.innerHTML = loginTemplate({name: 'Johan'});
        this.parent.appendChild(loginComponent);
    }
}

export let loginManager = new LoginComponentManager();
