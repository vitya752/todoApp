const {Router} = require('express');
const Dialog = require('../models/Dialog');
const Message = require('../models/Message'); 
const User = require('../models/User');

const router = new Router();

router.get('/', async (req, res) => {
    try {
        const { userId } = req.user;
        
        const dialogs = await Dialog
                                .find()
                                .or( [{ author: userId }, { partner: userId }] )
                                .populate(['author', 'partner'])
                                .populate('lastMessage', 'text author');

        if(!dialogs.length > 0) {
            return res.status(400).json({ 
                message: 'У вас нету диалогов'
            });
        }

        // delete dialogs.author.password;
        // delete dialogs.partner.password;

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
        const { partnerId } = req.body;
        
        const dialog = await Dialog.findOne()
                                    .or( [{ author: userId, partner: partnerId }, { author: partnerId, partner: userId }] );

        if(dialog) {
            return res.status(403).json({
                status: 'error',
                message: 'Такой диалог уже существует',
            });
        } else {
            const dialog = new Dialog({
                author: userId,
                partner: partnerId
            });
            dialog
                .save()
                .then(dialogObj => {
                    const { _id } = dialogObj;
                    const { text } = req.body;
                    const message = new Message({
                        text,
                        dialogId: _id,
                        author: userId
                    });

                    message 
                        .save()
                        .then(messageObj => {
                            const { _id: messageId } = messageObj;
                            dialogObj.lastMessage = messageId;
                            dialogObj
                                .save()
                                .then((response) => {
                                    res.json({
                                        dialog: response
                                    });
                                })
                        })
                        .catch(e => {
                            res.json(e);
                        });
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