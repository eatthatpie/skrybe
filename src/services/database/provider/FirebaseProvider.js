import firebase from 'firebase/app';
import 'firebase/database';
import config from './../config';

export default class FirebaseProvider {
    constructor() {
        firebase.initializeApp(config.database.firebaseProvider);
        this.db = firebase.database();
    }

    fetch(ref) {
        return this.db.ref(ref).once('value')
    }

    set(ref, data, callback) {
        return this.db.ref(ref).set(data, callback);
    }
};
