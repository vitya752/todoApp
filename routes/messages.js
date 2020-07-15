const {Router} = require('express');
const Dialog = require('../models/Dialog');
const User = require('../models/User');
const Message = require('../models/Message');

const router = new Router();

router.get('/:dialogId', async (req, res) => {
    try {

        const { dialogId } = req.params;

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
            const message = await new Message({
                dialogId,
                text,
                author: userId
            });

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