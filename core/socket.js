const socket = require('socket.io');

const User = require('../models/User');
const OnlineChatUsers = require('../models/OnlineChatUsers');

module.exports = (http) => {

    const io = socket(http);

    io.sockets.on('connection', (socket) => {

        socket.on('disconnect', () => {
            console.log('Exit')
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
            console.log('Yes');
            const user = await User.findOne({ _id: data.userId });
            if(user) {
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

    });

    return io;
};