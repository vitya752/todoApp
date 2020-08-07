const checkToken = require('../utils/checkToken');

module.exports = async (req, res, next) => {
    if(req.method === 'OPTION') {
        next();
    }

    if(
        // req.path === "/build/static" ||
        req.path === "/api/auth/register" ||
        req.path === "/api/auth/login" ||
        req.path === "/api/auth/check"
    ) {
        return next();
    }

    try {
        // const token = req.headers.authorization.split(' ')[1]; //Bearer TOKEN

        checkToken(req, res, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjBmMzM0NDZlODAwOTA5ZjhiYTk5NTciLCJpYXQiOjE1OTY4NDM2MzAsImV4cCI6MTU5NjkzMDAzMH0.6oUiA3g32vvMJl44OzE-Rp5WUD7QqQFRCPhZ-mCaV2I");
        
        return next();

    } catch(e) {
        res.status(401).json({ message: 'Нет авторизации' });
    }
};