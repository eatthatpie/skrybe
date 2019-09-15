export default class Auth {
    constructor({ provider }) {
        this.isAuth = false;
        this.provider = provider;
    }

    getCurrentUserId() {
        return this.provider.getCurrentUserId();
    }

    onAuthStateChanged(callback) {
        return this.provider.onAuthStateChanged(callback);
    }

    setIsAuth(isAuth) {
        this.isAuth = isAuth;
    }

    signInWithFacebookPopup() {
        return this.provider.signInWithFacebookPopup()
    }

    signInWithGooglePopup() {
        return this.provider.signInWithGooglePopup()
    }
    
    signOut() {
        return this.provider.signOut();
    }
};
