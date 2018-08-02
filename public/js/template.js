import User from './user';

export default class Template {

    constructor() {
        this._userInstance = User.instance;
    }

    getNewUser(name) {
        return `<div class="card teal lighten-2">
                    <div class="card-content white-text">
                        <p>New user: ${name} joined chat</p>
                    </div>
                </div>`;
    }

    getUserToList(user) {
        return `<li class="collection-item" data-user-id="${user.id}">${user.name}</li>`
    }

    getChatMessage(message) {
        const isOwner = message.userId === this._userInstance.user.id;
        const background = isOwner ? 'blue-grey darken-1' : message.userGone ? 'red accent-2' : 'teal darken-1';
        return `<div class="message ${isOwner ? 'from' : 'to'}">
                    <div class="card ${background}">
                        <div class="card-content white-text">
                            <p>${isOwner ? '' : message.userName + ': '}${message.text}</p>
                        </div>
                    </div>
                </div>`;
    }

    getTypingTemplate(userName) {
        return `<div class="message to">
                    <div class="card grey">
                        <div class="card-content white-text">
                            <p>${userName} is typing ...</p>
                        </div>
                    </div>
                </div>`;
    }
}