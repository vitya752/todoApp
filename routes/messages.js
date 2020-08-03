const {Router} = require('express');
const Dialog = require('../models/Dialog');
const Message = require('../models/Message');

const router = new Router();

module.exports = (io) => {

    const _updateReadStatus = async (dialogId, userId) => {

        const dialog = await Dialog.findOne({_id: dialogId}).populate('lastMessage');
    
        const authorId = dialog.lastMessage.author;
    
        if((userId + '') !== (authorId + '') && dialog.unreadMessages > 0) {
            await Dialog.findOneAndUpdate({ _id: dialogId }, { unreadMessages: 0 })
                .then(() => {
                    io.to(userId).to(authorId).emit('DIALOGS:MESSAGES_READED', {
                        dialogId
                    });
                });
        }
    };
    
    
    router.get('/:dialogId', async (req, res) => {
        try {
    
            const { userId } = req.user;
            const { dialogId } = req.params;
    
            _updateReadStatus(dialogId, userId);
    
            const messages = await Message.find({dialogId});
            
            if(messages) {
                return res.status(200).json({
                    messages,
                    message: `Сообщения из диалога '${dialogId}' отправлены`
                });
            }
    
            return res.status(400).json({ 
                message: 'Этого диалога не существует.'
            });
    
        } catch(e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
        }
    });
    
    router.post('/', async (req, res) => {
        try {
            const { userId } = req.user;
            const { dialogId, text } = req.body;
    
            if(text) {
                const message = new Message({
                    dialogId,
                    text,
                    author: userId
                });
                const { _id } = message;
    
                const dialog = await Dialog.findOne({ _id: dialogId }).populate('lastMessage');

                if(dialog) {
                    if((dialog.lastMessage.author._id + '') === userId) {
                        dialog.unreadMessages = dialog.unreadMessages + 1;
                    } else {
                        dialog.unreadMessages = 1;
                    }
                    dialog.lastMessage = _id;
                }
                
                await dialog.save();
                await message.save();
    
                return res.status(201).json({ 
                    message: 'Сообщение отправлено',
                    messageObj: message,
                    unreadMessages: dialog.unreadMessages + 1
                });
            }
    
            return res.status(400).json({ message: 'Напишите какой-то текст!' });
    
        } catch(e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
        }
    });

    return router;
};