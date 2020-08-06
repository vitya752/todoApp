const {Router} = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const User = require('./../models/User');
const {reqValidator, loginValidator} = require('./../validatiors/validators.auth');
const keys = require('./../keys');
const checkToken = require('../utils/checkToken');

const router = Router();

router.post('/register', reqValidator, async (req, res) => {
    try {
        const {email, password} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const arr = errors.array();
            return res.status(400).json({ 
                errors: arr,
                message: arr.map(item => {
                    return item.msg
                }).join(', ')
            });
        }

    
        const hashPass = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            password: hashPass
        });
        await user.save();
    
        res.status(201).json({message: 'Пользователь успешно создан'});
    } catch(e) {
        res.status(500).json({
            errors: ['Что-то пошло не так, попробуйте еще раз'],
            message: 'Что-то пошло не так, попробуйте еще раз'
        });
    }
});

router.post('/login', loginValidator, async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            const arr = errors.array();
            return res.status(400).json({ 
                errors: arr,
                message: arr.map(item => {
                    return item.msg
                }).join(', ')
            });
        }

        const {email} = req.body;
        const candidate = await User.findOne({ email });
        const token = jwt.sign({userId: candidate.id}, keys.JWT_SECRET, {expiresIn: '24h'});
        
        res.status(200).json({ 
            userId: candidate.id, 
            token,
            email,
            nickname: candidate.nickname,
            avatar: candidate.avatar,
            message: 'Успешная аутентификация',
            lastSeen: candidate.lastSeen
        });

    } catch(e) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте еще раз'
        });
    }
});

router.post('/check', (req, res) => {
    try {
        const { token } = req.body;
        if(token && checkToken(req, res, token)) return res.status(202).json({message: 'Получен доступ'});
    } catch(e) {
        res.status(200).json({
            message: 'Залогинитесь пожалуйста'
        });
    }
});

module.exports = router;