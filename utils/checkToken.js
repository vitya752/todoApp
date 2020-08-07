const jwt = require('jsonwebtoken');
const keys = require('./../keys');

module.exports = (req, res, token) => {
    if(token) {
        return true
    } else return res.status(200).json({ message: 'Перезайдите пожалуйста...' });

    return true;
};