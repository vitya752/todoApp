const Router = require('express');
const User = require('../models/User');
const Note = require('../models/Note');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/update', auth, async (req, res) => {
    try {

        const { userId, nickname, avatar } = req.body;
        const user = await User.findOne({ _id: userId });

        if(!user) {
            return res.status(400).json({ message: 'Пользователь не найден...' });
        }

        await User.findByIdAndUpdate(userId, {
            nickname,
            avatar
        });

        return res.status(202).json({ message: 'Настройки обновлены' });

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
    }
});

router.post('/delete', auth, async (req, res) => {
    try {

        const { userId } = req.body;
        console.log(userId)
        const user = await User.findOne({ _id: userId });

        if(!user) {
            return res.status(400).json({ message: 'Пользователь не найден...' });
        }

        await User.deleteOne({  _id: userId });
        await Note.deleteMany({ owner: userId });

        return res.status(202).json({ message: 'Аккаунт удален!' });

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
    }
});

module.exports = router;