/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/app.js":
/*!**************************!*\
  !*** ./public/js/app.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ \"./public/js/user.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ \"./public/js/ui.js\");\n/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller */ \"./public/js/controller.js\");\n\r\n\r\n\r\n\r\nclass Chat {\r\n\r\n    constructor() {\r\n\r\n        const user = _user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].instance;\r\n        const ui = new _ui__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this._controller = new _controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"](user, ui);\r\n\r\n    }\r\n\r\n    run() {\r\n        this._controller.start();\r\n    }\r\n}\r\n\r\nconst chat = new Chat();\r\n\r\nchat.run();\n\n//# sourceURL=webpack:///./public/js/app.js?");

/***/ }),

/***/ "./public/js/controller.js":
/*!*********************************!*\
  !*** ./public/js/controller.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Controller; });\nclass Controller {\r\n\r\n    constructor (user, ui) {\r\n        this._socket = io();\r\n        this._userInstance = user;\r\n        this._ui = ui;\r\n        this._typing = false;\r\n        this._lastTypingTime = null;\r\n        this._TYPING_TIMER_LENGTH = 600;\r\n    }\r\n\r\n    start() {\r\n        this._listenEvents();\r\n    }\r\n\r\n    _listenEvents() {\r\n        // UI events\r\n        this._ui.loginForm.on('submit', this._loginHandler.bind(this));\r\n        this._ui.messageForm.on('submit', this._sendMsgHandler.bind(this));\r\n        this._ui.messageTextField.on('input', this._updateTyping.bind(this));\r\n\r\n        // SOCKET EVENTS\r\n        this._socket.on('welcome', this._welcomeHandler.bind(this));\r\n\r\n        this._socket.on('user_joined', this._userJoined.bind(this));\r\n\r\n        this._socket.on('update_users_list', this._updateUsersList.bind(this));\r\n\r\n        this._socket.on('chat_message', this._addChatMessage.bind(this));\r\n\r\n        this._socket.on('typing', this._typingHandler.bind(this));\r\n\r\n        this._socket.on('stop_typing', this._stopTypingHandler.bind(this));\r\n    }\r\n\r\n    _loginHandler(e) {\r\n        e.preventDefault();\r\n\r\n        const userName = e.target.username.value;\r\n\r\n        this._socket.emit('new_user', userName);\r\n    }\r\n\r\n    _sendMsgHandler(e) {\r\n        e.preventDefault();\r\n\r\n        const message = e.target.message.value;\r\n\r\n        this._socket.emit('message', {\r\n\r\n            userName: this._userInstance.user.name,\r\n            userId: this._userInstance.user.id,\r\n            text: message\r\n\r\n        });\r\n    }\r\n\r\n    _welcomeHandler(user) {\r\n        this._userInstance.user = user;\r\n\r\n        this._ui.userLoggedIn(this._userInstance.user.name);\r\n\r\n    }\r\n\r\n    _userJoined(name) {\r\n        this._ui.addUser(name);\r\n    }\r\n\r\n    _updateUsersList(users){\r\n        this._ui.updateUsersList(users);\r\n\r\n    }\r\n\r\n    _addChatMessage(message){\r\n        this._ui.addChatMessage(message);\r\n    }\r\n\r\n    _updateTyping() {\r\n        if(!this._typing) {\r\n            this._typing = true;\r\n            this._socket.emit('typing');\r\n        }\r\n\r\n        this._lastTypingTime = new Date().getTime();\r\n\r\n        setTimeout( () => {\r\n            const typingTimer = new Date().getTime();\r\n\r\n            const timerDiff = typingTimer - this._lastTypingTime;\r\n\r\n            if(timerDiff >= this._TYPING_TIMER_LENGTH && this._typing) {\r\n                this._socket.emit('stop_typing');\r\n                this._typing = false;\r\n            }\r\n        },this._TYPING_TIMER_LENGTH)\r\n    }\r\n\r\n    _typingHandler(userName) {\r\n        this._ui.showTypingMessage(userName);\r\n    }\r\n\r\n    _stopTypingHandler() {\r\n        this._ui.hideTypingMessage();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./public/js/controller.js?");

/***/ }),

/***/ "./public/js/template.js":
/*!*******************************!*\
  !*** ./public/js/template.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Template; });\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ \"./public/js/user.js\");\n\r\n\r\nclass Template {\r\n\r\n    constructor() {\r\n        this._userInstance = _user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].instance;\r\n    }\r\n\r\n    getNewUser(name) {\r\n        return `<div class=\"card teal lighten-2\">\r\n                    <div class=\"card-content white-text\">\r\n                        <p>New user: ${name} joined chat</p>\r\n                    </div>\r\n                </div>`;\r\n    }\r\n\r\n    getUserToList(user) {\r\n        return `<li class=\"collection-item\" data-user-id=\"${user.id}\">${user.name}</li>`\r\n    }\r\n\r\n    getChatMessage(message) {\r\n        const isOwner = message.userId === this._userInstance.user.id;\r\n        const background = isOwner ? 'blue-grey darken-1' : message.userGone ? 'red accent-2' : 'teal darken-1';\r\n        return `<div class=\"message ${isOwner ? 'from' : 'to'}\">\r\n                    <div class=\"card ${background}\">\r\n                        <div class=\"card-content white-text\">\r\n                            <p>${isOwner ? '' : message.userName + ': '}${message.text}</p>\r\n                        </div>\r\n                    </div>\r\n                </div>`;\r\n    }\r\n\r\n    getTypingTemplate(userName) {\r\n        return `<div class=\"message to\">\r\n                    <div class=\"card grey\">\r\n                        <div class=\"card-content white-text\">\r\n                            <p>${userName} is typing ...</p>\r\n                        </div>\r\n                    </div>\r\n                </div>`;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./public/js/template.js?");

/***/ }),

/***/ "./public/js/ui.js":
/*!*************************!*\
  !*** ./public/js/ui.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UI; });\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template */ \"./public/js/template.js\");\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ \"./public/js/user.js\");\n\r\n\r\n\r\nclass UI {\r\n\r\n    constructor() {\r\n        this._template = new _template__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this._userInstance = _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].instance;\r\n        this.loginForm = $('.login-form');\r\n        this.messageForm = $('form[name=\"send-message\"]');\r\n        this.messageTextField = this.messageForm.find('#message');\r\n        this._loginBlock = $('.login');\r\n        this._authorizedBlock = $('.authorized');\r\n        this._userNameField = $('.user-name');\r\n        this._messageContainer = $('.message-container');\r\n        this._userList = $('.user-list');\r\n    }\r\n\r\n    userLoggedIn(name){\r\n        this._userNameField.text(name);\r\n        this._loginBlock.hide();\r\n        this._authorizedBlock.show();\r\n    }\r\n\r\n    addUser(name) {\r\n        const template = this._template.getNewUser(name);\r\n\r\n        this._messageContainer.append(template);\r\n\r\n        this.loginForm[0].reset();\r\n\r\n    }\r\n\r\n    updateUsersList(users) {\r\n        this._userList.text('');\r\n        Object.keys(users).forEach(name => {\r\n\r\n            if (users[name].id !== this._userInstance.user.id) {\r\n                this._userList.append(this._template.getUserToList({\r\n                    name: name,\r\n                    id: user[name].id\r\n                }));\r\n            }\r\n        })\r\n\r\n    }\r\n\r\n    addChatMessage(message) {\r\n        const template = this._template.getChatMessage(message);\r\n\r\n        this._messageContainer.append(template);\r\n\r\n        this.messageForm[0].reset();\r\n\r\n\r\n    }\r\n\r\n\r\n    showTypingMessage(userName) {\r\n        this._typingTemplate = $(this._template.getTypingTemplate(userName));\r\n\r\n        this._messageContainer.append(this._typingTemplate);\r\n    }\r\n\r\n    hideTypingMessage() {\r\n        this._typingTemplate.remove();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./public/js/ui.js?");

/***/ }),

/***/ "./public/js/user.js":
/*!***************************!*\
  !*** ./public/js/user.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return User; });\nconst user = Symbol();\r\nconst singletonEnforcer = Symbol();\r\n\r\nclass User {\r\n\r\n    constructor(enforcer) {\r\n\r\n        if(enforcer != singletonEnforcer) {\r\n\r\n            throw \"Cannot construct singleton\";\r\n        }\r\n    }\r\n\r\n    static get instance() {\r\n\r\n        if(!this[user]) {\r\n            this[user] = new User(singletonEnforcer);\r\n        }\r\n\r\n        return this[user];\r\n    }\r\n\r\n    set user(userData) {\r\n        this._user = userData;\r\n    }\r\n\r\n    get user() {\r\n        return this._user;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./public/js/user.js?");

/***/ })

/******/ });