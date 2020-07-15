const User = require('../models/User');

module.exports = async (req, res, next) => {

    if(req.user) {
        await User.findOneAndUpdate(
            {_id: req.user.userId},
            {lastSeen: new Date()},
            {new: true}
        )
    }

    return next();

};