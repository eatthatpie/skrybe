export default class Auth {
    constructor({ provider }) {
        this.provider = provider;
    }

    getCurrentUserId() {
        return this.provider.getCurrentUserId();
    }

    signInWithFacebookPopup() {
        return this.provider.signInWithFacebookPopup()
    }

    signInWithGooglePopup() {
        return this.provider.signInWithGooglePopup()
    }
};
