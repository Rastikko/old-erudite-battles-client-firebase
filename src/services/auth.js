import Service from 'framework/service';

/** Deals with authentication. */
class AuthService extends Service {
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
    login() {
        // TODO: call firebase
        this.dispatch('authenticated');
    }
}

export let authService = new AuthService();
