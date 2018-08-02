import Template from './template';
import User from './user';

export default class UI {

    constructor() {
        this._template = new Template();
        this._userInstance = User.instance;
        this.loginForm = $('.login-form');
        this.messageForm = $('form[name="send-message"]');
        this.messageTextField = this.messageForm.find('#message');
        this._loginBlock = $('.login');
        this._authorizedBlock = $('.authorized');
        this._userNameField = $('.user-name');
        this._messageContainer = $('.message-container');
        this._userList = $('.user-list');
    }

    userLoggedIn(name){
        this._userNameField.text(name);
        this._loginBlock.hide();
        this._authorizedBlock.show();
    }

    addUser(name) {
        const template = this._template.getNewUser(name);

        this._messageContainer.append(template);

        this.loginForm[0].reset();

    }

    updateUsersList(users) {
        this._userList.text('');
        Object.keys(users).forEach(name => {

            if (users[name].id !== this._userInstance.user.id) {
                this._userList.append(this._template.getUserToList({
                    name: name,
                    id: user[name].id
                }));
            }
        })

    }

    addChatMessage(message) {
        const template = this._template.getChatMessage(message);

        this._messageContainer.append(template);

        this.messageForm[0].reset();


    }


    showTypingMessage(userName) {
        this._typingTemplate = $(this._template.getTypingTemplate(userName));

        this._messageContainer.append(this._typingTemplate);
    }

    hideTypingMessage() {
        this._typingTemplate.remove();
    }
}