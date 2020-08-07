const jwt = require('jsonwebtoken');
const keys = require('./../keys');

module.exports = (req, res, token) => {
    if(token) {
        const decoded = jwt.verify(token, keys.JWT_SECRET);
        const date = Date.now();

        if(date > decoded.exp * 1000) {
            return res.status(200).json({ message: 'Перезайдите пожалуйста...' });
        }
        req.user = decoded;
    } else return res.status(200).json({ message: 'Перезайдите пожалуйста...' });

    return true;
};