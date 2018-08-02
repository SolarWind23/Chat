import User from './user';
import UI from './ui';
import Controller from './controller';

class Chat {

    constructor() {

        const user = User.instance;
        const ui = new UI();
        this._controller = new Controller(user, ui);

    }

    run() {
        this._controller.start();
    }
}

const chat = new Chat();

chat.run();