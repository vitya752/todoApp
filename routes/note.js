const {Router} = require('express');
const Note = require('../models/Note');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const data = await Note.find({ owner: req.user.userId });

        if(!data) {
            res.status(204).json({ 
                message: 'Заметок нету...'
            });
        }

        return res.status(200).json({ 
            notes: data,
            message: 'Заметки успешно загружены.'
        });

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const {text} = req.body;
        const {userId} = req.user;

        if(text === '') {
            return res.status(400).json({ message: 'Напишите какой-то текст!' });
        }

        const note = new Note({
            text,
            owner: userId
        });

        note.save();

        return res.status(201).json({ 
            note,
            message: 'Заметка успешно создана'
        });

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
    }
});

router.post('/delete', async (req, res) => {
    try {
        const {id} = req.body;
        const {userId} = req.user;
        const note = await Note.findOne({ _id: id, owner: userId });

        if(!note) {
            return res.status(400).json({ 
                message: 'Сервер не нашел данную заметку'
            });
        }

        await Note.deleteOne({ _id: id, owner: userId });

        return res.status(202).json({ message: 'Заметка удалена' });
        
    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
    }
});

router.patch('/update', async (req, res) => {
    try {
        const {userId} = req.user;
        const {id, important, done} = req.body;
        const note = await Note.findOne({ _id: id, owner: userId });

        if(!note) {
            return res.status(400).json({ message: 'Сервер не нашел данную заметку' });
        }

        await Note.findByIdAndUpdate(id, {
            important,
            done
        });

        const updateNote = await Note.findOne({ _id: id, owner: userId });

        return res.status(202).json({ 
            note: updateNote,
            message: 'Заметка обновлена'
        });

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
    }
});

module.exports = router;