import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './../config';

export default class FirebaseProvider {
    constructor() {
        firebase.initializeApp(config.database.firebaseProvider);

        this.auth = firebase.auth();
        this.db = firebase.database();
        this.facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
        this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    }

    getCurrentUserId() {
        return this.isAuth() ? this.auth.currentUser.uid : null;
    }

    fetch(ref) {
        return this.db.ref(ref).once('value');
    }

    isAuth() {
        return this.auth.currentUser !== null;
    }

    onAuthStateChanged(callback) {
        return this.auth.onAuthStateChanged(callback);
    }

    set(ref, data, callback) {
        return this.db.ref(ref).set(data, callback);
    }

    signInWithFacebookPopup() {
        return this.auth
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return this.auth.signInWithPopup(this.facebookAuthProvider)
                    .then(function(result) {
                        const token = result.credential.accessToken;
                        const user = result.user;
                    })
                    .catch(function(e) {
                        console.error(e);
                    });
            })
            
    }

    signInWithGooglePopup() {
        return this.auth
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return this.auth.signInWithPopup(this.googleAuthProvider)
                    .then(function(result) {
                        const token = result.credential.accessToken;
                        const user = result.user;
                    })
                    .catch(function(e) {
                        console.error(e);
                    });
                });
    }

    signOut() {
        return this.auth.signOut();
    }
};
