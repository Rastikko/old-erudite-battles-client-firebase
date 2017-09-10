import {auth} from 'services/auth';
import {viewport} from 'services/viewport';
import LoginComponent from 'components/login';
import BattleComponent from 'components/battle';
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
        this._transitionMap.set('battle', BattleComponent);
    }

    /**
        Will start triggering the state machine logic
    */
    init() {
        if (auth.isAuthenticated) {
            this.transitionTo('login');
        } else {
            this.transitionTo('battle');
        }

        auth.on('authenticated', () => {
            this.transitionTo('battle');
        });
    }

    /**
        Will create a new component and transition to it
        @param {string} componentName
    */
    transitionTo(componentName) {
        if (this.currentComponent && !this.currentComponent.isDestroyed) {
            this.currentComponent.destroy().then(() => {
                delete this.currentComponent;
                this.transitionTo(componentName);
            });
            return;
        }
        const ComponentClass = this._transitionMap.get(componentName);
        const component = new ComponentClass();
        viewport.transitionTo(component.element);
        this.currentComponent = component;
    }
}

export let gameManager = new GameManager();
