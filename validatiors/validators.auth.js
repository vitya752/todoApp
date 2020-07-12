const {check} = require('express-validator');
const User = require('./../models/User');
const bcrypt = require('bcryptjs');

exports.reqValidator = [
    check('email', 'Введите корректный email').isEmail(),
    check('password', 'Пароль должен быть не меньше 6 символов').isLength({ min: 6 }),
    check('email').custom(async (value, {req}) => {
        const candidate = await User.findOne({ email: value });
        if(candidate) {
            return Promise.reject('Такой email уже зарегистрирован');
        }
    })
];

exports.loginValidator = [
    check('email').custom(async (value, {req}) => {
        const candidate = await User.findOne({ email: value });
        if(!candidate) {
            return Promise.reject('Такой email еще не зарегистрирован')
        }
    }),
    check('password').custom(async (value, {req}) => {
        const {email} = req.body;
        const candidate = await User.findOne({ email });

        if(candidate) {
            const userPassword = await candidate.password;
            const isMatch = await bcrypt.compare(value, userPassword);
            if(!isMatch) {
                return Promise.reject('Неправильный пароль');
            }
        }
    })
];