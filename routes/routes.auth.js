const {Router} = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const User = require('./../models/User');
const {reqValidator, loginValidator} = require('./../validatiors/validators.auth');
const keys = require('./../keys');

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
        const token = jwt.sign({userId: candidate.id}, keys.JWT_SECRET, {expiresIn: '1h'});
        
        res.status(200).json({ 
            userId: candidate.id, 
            token,
            email,
            nickname: candidate.nickname,
            avatar: candidate.avatar,
            message: 'Успешная аутентификация'
        });

    } catch(e) {
        res.status(500).json({
            errors: ['Что-то пошло не так, попробуйте еще раз'],
            message: 'Что-то пошло не так, попробуйте еще раз'
        });
    }
});

// router.post('/check', async (req, res) => {
//     try {
//         const {userId, localToken} = req.body;
//         const decode = jwt.verify(token, keys.JWT_SECRET);
//         const user = await User.findOne({ id: decode.userId });

//         if(userId === decode.userId) {
//             if(!user) {
//                 return res.status(401).json({errors: ['Что-то пошло не так, попробуйте еще раз']});
//             }
//             const date = Date.now();
//             if(date > decode.exp) {
//                 return res.status(401).json({result: 'logout'});
//             }
//             return res.status(201).json({result: 'login'});
//         }

//     } catch(e) {

//     }
// });

module.exports = router;