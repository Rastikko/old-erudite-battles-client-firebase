/** just add observing functionality */
class Listener {
    /**
        Just the constructor
    */
    constructor() {
        this.observers = new Map();
    }

    /**
        Will callback when event happens
        @param {String} event
        @param {function} callback
    */
    on(event, callback) {
        if (!this.observers.get(event)) {
            const callbacks = new Set();
            this.observers.set(event, callbacks);
        }
        this.observers.get(event).add(callback);
    }

    /**
        Dispatch all listeners
        @param {String} event
    */
    dispatch(event) {
        const callbacks = this.observers.get(event);
        if (callbacks) {
            callbacks.forEach((callback) => callback());
        }
    }
}

export default Listener;
