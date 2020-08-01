const socket = require('socket.io');

const User = require('../models/User');
const OnlineChatUsers = require('../models/OnlineChatUsers');

module.exports = (http) => {

    const io = socket(http);

    io.sockets.on('connection', (socket) => {

        socket.on('disconnect', () => {
            if(socket.chat) {
                deleteAndUpdateOnlineUsers();
            }
        });

        socket.on('CHAT:JOIN', async (data) => {
            const user = await OnlineChatUsers.findOne({ userId: data.userId });
            
            if(!user) {
                const candidate = new OnlineChatUsers({
                    _id: socket.id,
                    userId: data.userId
                });
                await candidate.save();
            }

            socket.chat = true;
            socket.join('chat');

            sendOnlineUsers();

        });

        socket.on('CHAT:SEND_MESSAGE', async (data) => {
            const user = await User.findOne({ _id: data.userId });
            if(user) {

                const date = new Date();

                io.sockets.to('chat').emit('CHAT:ADD_MESSAGE', {
                    senderId: data.userId,
                    author: user.nickname || user.email,
                    avatar: user.avatar,
                    text: data.text
                });
            }
        });

        const sendOnlineUsers = async () => {
            let onlineUsers = await OnlineChatUsers.find().populate('userId', 'avatar nickname');
            io.to('chat').emit('CHAT:PUSH_ONLINE_USERS_ON_CLIENT', {onlineUsers});
        };

        const deleteAndUpdateOnlineUsers = async () => {
            await OnlineChatUsers.deleteOne({ _id: socket.id });
            io.to('chat').emit('CHAT:DELETE_USER', {id: socket.id});
        };




        socket.on('DIALOGS:JOIN', (data) => {
            socket.dialog = true;
            socket.join(data.userId);
        });

        socket.on('DIALOGS:JOIN_TO_DIALOG', data => {
            socket.join(data.dialogId);
        });

        socket.on('DIALOGS:SEND_MESSAGE_TO_DIALOG', (data) => {

            const { dialogId, user, text, partnerId  } = data;

            const message = {
                senderId: user.userId,
                author: user.nickname || user.email,
                avatar: user.avatar,
                text: text
            };

            const newDialog = {
                dialogId,
                text,
                date: new Date()
            };

            io.sockets.to(dialogId).to(partnerId).emit('DIALOGS:ADD_MESSAGE', {
                message,
                newDialog
            });

        });

    });

    return io;
};