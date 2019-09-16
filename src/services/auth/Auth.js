export default class Auth {
    constructor({ provider }) {
        this.provider = provider;
    }

    getCurrentUserId() {
        return this.provider.getCurrentUserId();
    }

    isAuth() {
        return this.provider.isAuth();
    }

    onAuthStateChanged(callback) {
        return this.provider.onAuthStateChanged(callback);
    }

    signInWithFacebookPopup() {
        return this.provider.signInWithFacebookPopup()
    }

    signInWithGooglePopup() {
        return this.provider.signInWithGooglePopup()
    }

    signInWithTwitterPopup() {
        return this.provider.signInWithTwitterPopup()
    }
    
    signOut() {
        return this.provider.signOut();
    }
};
