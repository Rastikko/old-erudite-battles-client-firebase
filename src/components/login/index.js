const loginTemplate = require('./template.handlebars');

class LoginComponent {

    setParent(domElement) {
        this.parent = domElement;
    }

    render() {
        this.parent.innerHTML = loginTemplate({name: "Johan"});
    }
}

export let loginManager = new LoginComponent();
