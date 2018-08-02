const user = Symbol();
const singletonEnforcer = Symbol();

export default class User {

    constructor(enforcer) {

        if(enforcer != singletonEnforcer) {

            throw "Cannot construct singleton";
        }
    }

    static get instance() {

        if(!this[user]) {
            this[user] = new User(singletonEnforcer);
        }

        return this[user];
    }

    set user(userData) {
        this._user = userData;
    }

    get user() {
        return this._user;
    }
}