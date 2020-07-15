const jwt = require('jsonwebtoken');
const keys = require('./../keys');

module.exports = async (req, res, next) => {
    if(req.method === 'OPTION') {
        next();
    }

    if(
        req.path === "/api/auth/register" ||
        req.path === "/api/auth/login"
    ) {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; //Bearer TOKEN

        if(token) {
            const decoded = jwt.verify(token, keys.JWT_SECRET);
            const date = Date.now();

            if(date > decoded.exp * 1000) {
                return res.status(401).json({ message: 'Нет авторизации' });
            }
            req.user = decoded;
        } else return res.status(401).json({ message: 'Нет авторизации' });
        
        return next();

    } catch(e) {
        res.status(401).json({ message: 'Нет авторизации' });
    }
};