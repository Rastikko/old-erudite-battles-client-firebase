/** Base Component class, all others must extend it. */
class Component {
    /**
        will create the element and render the template
        @param {object} options - The options.
    */
    constructor(options) {
        const content = options.template(options.model);

        this.element = document.createElement('div');
        this.element.innerHTML = content;
        this.element.classList.add(options.className);
    }

    /**
        Override to define behaviour when the component is going to be destroyed
        @return {Promise}
    */
    destroy() {
        this.destroyed = true;
        return Promise.resolve();
    }
}

export default Component;
