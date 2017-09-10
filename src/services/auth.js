import Service from 'framework/service';
import {database} from 'services/database';

/** Deals with authentication. */
class Auth extends Service {
    /**
        Returns if there is a logged in user
    */
    init() {
        database.firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }

    /**
        Returns if there is a logged in user
        @return {boolean};
    */
    isAuthenticated() {
        return false;
    }

    /**
        Authenticate
    */
    anonymousAuthentication() {
        database.firebase.auth().signInAnonymously().catch(this.onAuthFailed.bind(this));
    }

    /**
        Handle firebase catch event
        @param {object} error
    */
    onAuthFailed(error) {
        console.log('onAuthFailed: ', error);
        this.dispatch('authenticationError', error);
    }

    /**
        Handle firebase authenitcation change
        @param {object} userData - if no user data it means he logged out
    */
    onAuthStateChanged(userData) {
        console.log('onAuthStateChanged', userData);
        if (userData) {
            this.dispatch('authenticated');
        }
        this.dispatch('unauthenticated');
    }
}

export let auth = new Auth();
