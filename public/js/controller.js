export default class Controller {

    constructor (user, ui) {
        this._socket = io();
        this._userInstance = user;
        this._ui = ui;
        this._typing = false;
        this._lastTypingTime = null;
        this._TYPING_TIMER_LENGTH = 600;
    }

    start() {
        this._listenEvents();
    }

    _listenEvents() {
        // UI events
        this._ui.loginForm.on('submit', this._loginHandler.bind(this));
        this._ui.messageForm.on('submit', this._sendMsgHandler.bind(this));
        this._ui.messageTextField.on('input', this._updateTyping.bind(this));

        // SOCKET EVENTS
        this._socket.on('welcome', this._welcomeHandler.bind(this));

        this._socket.on('user_joined', this._userJoined.bind(this));

        this._socket.on('update_users_list', this._updateUsersList.bind(this));

        this._socket.on('chat_message', this._addChatMessage.bind(this));

        this._socket.on('typing', this._typingHandler.bind(this));

        this._socket.on('stop_typing', this._stopTypingHandler.bind(this));
    }

    _loginHandler(e) {
        e.preventDefault();

        const userName = e.target.username.value;

        this._socket.emit('new_user', userName);
    }

    _sendMsgHandler(e) {
        e.preventDefault();

        const message = e.target.message.value;

        this._socket.emit('message', {

            userName: this._userInstance.user.name,
            userId: this._userInstance.user.id,
            text: message

        });
    }

    _welcomeHandler(user) {
        this._userInstance.user = user;

        this._ui.userLoggedIn(this._userInstance.user.name);

    }

    _userJoined(name) {
        this._ui.addUser(name);
    }

    _updateUsersList(users){
        this._ui.updateUsersList(users);

    }

    _addChatMessage(message){
        this._ui.addChatMessage(message);
    }

    _updateTyping() {
        if(!this._typing) {
            this._typing = true;
            this._socket.emit('typing');
        }

        this._lastTypingTime = new Date().getTime();

        setTimeout( () => {
            const typingTimer = new Date().getTime();

            const timerDiff = typingTimer - this._lastTypingTime;

            if(timerDiff >= this._TYPING_TIMER_LENGTH && this._typing) {
                this._socket.emit('stop_typing');
                this._typing = false;
            }
        },this._TYPING_TIMER_LENGTH)
    }

    _typingHandler(userName) {
        this._ui.showTypingMessage(userName);
    }

    _stopTypingHandler() {
        this._ui.hideTypingMessage();
    }
}