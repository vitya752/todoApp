const {Router} = require('express');
const Dialog = require('../models/Dialog');
const Message = require('../models/Message');

const router = new Router();

router.get('/', async (req, res) => {
    try {
        const { userId } = req.user;
        
        const dialogs = await Dialog
                                .find()
                                .or( [{ author: userId }, { partner: userId }] )
                                .populate(['author', 'partner'])
                                .populate('lastMessage');

        if(!dialogs.length > 0) {
            return res.status(400).json({ 
                message: 'У вас нету диалогов'
            });
        }

        return res.status(200).json({ 
            dialogs,
            message: 'Диалоги загружены'
        });

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { userId } = req.user;
        const { partnerId, text } = req.body;
        
        const dialog = await Dialog.findOne()
                                    .or( [{ author: userId, partner: partnerId }, { author: partnerId, partner: userId }] )
                                    .populate(['author', 'partner'])
                                    .populate('lastMessage');

        if(dialog) {

            const message = new Message({
                text,
                dialogId: dialog._id,
                author: userId
            });

            await message.save();

            dialog.lastMessage = message._id;

            await dialog.save();

            dialog.lastMessage = message;

            return res.json({
                dialog,
                message: 'Такой диалог уже существует',
            });
        } else {
            const newDialog = new Dialog({
                author: userId,
                partner: partnerId
            });
            
            const { _id } = newDialog;
            const message = new Message({
                text,
                dialogId: _id,
                author: userId
            });

            message 
                .save()
                .then(messageObj => {
                    const { _id: messageId } = messageObj;
                    newDialog.lastMessage = messageId;
                    newDialog.unreadMessages = 1;
                    newDialog
                        .save()
                        .then( async () => {

                            const response = await Dialog.findOne({_id})
                                                    .populate(['author', 'partner'])
                                                    .populate('lastMessage');

                            res.json({
                                dialog: response
                            });
                        })
                })
                .catch(e => {
                    res.json(e);
                });
        }

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
    }
});

module.exports = router;