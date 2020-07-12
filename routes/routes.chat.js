const { Router } = require('express');

const router = Router();

module.exports = (io) => {
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
    
    return router;
};


