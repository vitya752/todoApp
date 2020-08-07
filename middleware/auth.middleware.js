const checkToken = require('../utils/checkToken');

module.exports = async (req, res, next) => {
    if(req.method === 'OPTION') {
        next();
    }

    if(
        req.path === "/build/static" ||
        req.path === "/api/auth/register" ||
        req.path === "/api/auth/login" ||
        req.path === "/api/auth/check"
    ) {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; //Bearer TOKEN

        checkToken(req, res, token);
        
        return next();

    } catch(e) {
        res.status(401).json({ message: 'Нет авторизации' });
    }
};