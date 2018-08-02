const express = require('express');

const app = express();

const path = require('path');

const server = require('http').createServer(app);

const io = require('socket.io')(server);

const port = process.env.PORT || 3000;


server.listen(port, () => {
    console.log(`Server runs on port: ${port}`);
}); 

// Routing
app.use(express.static(path.join(__dirname, 'public')));


//users currently connected
const users = {};

io.on('connection', socket => {
    
    var isUser = false;


    socket.on('new_user', user => {

        if (isUser) return;

        socket.username = user;

        users[user] = {id: socket.id};

        isUser = true;

        socket.emit('welcome', {name: socket.username, id: socket.id});

        socket.broadcast.emit('user_joined', socket.username);

        io.emit('update_users_list', users);
    });

    socket.on('message', msgData => {

        io.emit('chat_message', msgData);

    });

    socket.on('disconnect', () => {
        if(!socket.username) return;

        io.emit('chat_message', { text: `has gone offline`, userName: socket.username, id: socket.id, userGone: true });
    
        delete users[socket.username];
    
        io.emit('update_users_list', users);
    });

    socket.on('typing', () => {

        socket.broadcast.emit('typing', socket.username);

    });

    socket.on('stop_typing', () => {

        socket.broadcast.emit('stop_typing');

    });
});

app.get('/', (req, res) => {

    res.sendFile(`${__dirname}/index.html`)

});