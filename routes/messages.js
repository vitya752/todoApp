const {Router} = require('express');
const Dialog = require('../models/Dialog');
const User = require('../models/User');
const Message = require('../models/Message');

const router = new Router();

const _updateReadStatus = async (res, dialogId, userId) => {
    await Message.updateMany(
        {dialogId, author: { $ne: userId }},
        { $set: { read: true } },
        (err) => {
            if(err) {
                res.status(500).json({
                    message: 'Не удалось обновить статус read',
                });
            } else {
                
            }
        }
    );
};

router.get('/:dialogId', async (req, res) => {
    try {

        const { dialogId } = req.params;

        _updateReadStatus(res, dialogId, userId);

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

            await Dialog.findOneAndUpdate({ _id: dialogId }, {lastMessage: _id});

            await message.save();

            return res.status(201).json({ 
                message: 'Сообщение отправлено'
            });
        }

        return res.status(400).json({ message: 'Напишите какой-то текст!' });

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
    }
});

module.exports = router;