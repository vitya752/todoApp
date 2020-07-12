const express = require('express');
const mongoose = require('mongoose');
const keys = require('./keys');
const authRouters = require('./routes/routes.auth');
const noteRouters = require('./routes/routes.note');
const settingsRouters = require('./routes/routes.settings');
const path = require('path');
const User = require('./models/User');
const OnlineChatUsers = require('./models/OnlineChatUsers');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || keys.PORT;

app.use(express.json({ extended: true }));

app.use('/api/auth', authRouters);
app.use('/api/note', noteRouters);
app.use('/api/settings', settingsRouters);

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

io.sockets.on('connection', (socket) => {

    socket.on('pushUserToOnline', async (data) => {
        const user = await OnlineChatUsers.findOne({ userId: data.userId });
        
        if(!user) {
            const candidate = new OnlineChatUsers({
                _id: socket.id,
                userId: data.userId
            });
            await candidate.save();
        }

        sendOnlineUsers();

    });

    socket.on('disconnect', async () => {
        deleteAndUpdateOnlineUsers();
    });

    socket.on('sendMess', async (data) => {
        const user = await User.findOne({ _id: data.userId });
        if(user) {
            io.sockets.emit('addMess', {
                senderId: data.userId,
                author: user.nickname || user.email,
                avatar: user.avatar,
                text: data.text
            });
        }
    });

    const sendOnlineUsers = async () => {
        let onlineUsers = await OnlineChatUsers.find().populate('userId', 'avatar nickname');
        io.sockets.emit('pushOnlineUsersOnClient', {onlineUsers});
    };

    const deleteAndUpdateOnlineUsers = async () => {
        await OnlineChatUsers.deleteOne({ _id: socket.id });
        io.sockets.emit('deleteUser', {id: socket.id});
    };

});

const start = async () => {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(e) {
        console.log(e);
    }
};

start();

//todoapp-practice@ukr.net
//12345vitya