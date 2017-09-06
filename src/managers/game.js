import {authService} from 'services/auth';
import {viewportService} from 'services/viewport';
import LoginComponent from 'components/login';
/**
    This class will handle the logic that know when and who transition between game phases
    Like for example from login to game, or from game to postgame
*/
class GameManager {
    /**
        Initiate all the observer logic
    */
    constructor() {
        this._transitionMap = new Map();
        this._transitionMap.set('login', LoginComponent);
    }

    /**
        Will start triggering the state machine logic
    */
    initiate() {
        if (authService.isAuthenticated) {
            this.transitionTo('login');
        } else {
            this.transitionTo('battle');
        }
    }

    /**
        Will create a new component and transition to it
        @param {string} componentName
    */
    transitionTo(componentName) {
        if (this.currentComponent) {
            this.currentComponent.destroy();
        }
        const ComponentClass = this._transitionMap.get(componentName);
        const component = new ComponentClass();
        viewportService.transitionTo(component.element);
        this.currentComponent = component;
    }
}

export let gameManager = new GameManager();
