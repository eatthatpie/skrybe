export default class Database {
    constructor({ provider }) {
        this.provider = provider;
    }

    fetch(ref) {
        return this.provider.fetch(ref);
    }

    set(ref, data, callback = () => {}) {
        return this.provider.set(ref, data, callback);
    }
};
