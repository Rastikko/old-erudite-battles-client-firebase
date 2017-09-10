import firebase from 'firebase';
import Service from 'framework/service';

/** handles all logic with firebase */
class Database extends Service {
    /**
        Initiate the connection to firebase
    */
    init() {
        const config = {
          apiKey: 'AIzaSyAVIsm86rkzBaAaX3W1z7-SCbGIzMy_8t4',
          authDomain: 'erudite-battles.firebaseapp.com',
          databaseURL: 'https://erudite-battles.firebaseio.com',
          storageBucket: 'gs://erudite-battles.appspot.com',
        };
        firebase.initializeApp(config);
        this.firebase = firebase;
    }
}

export let database = new Database();
