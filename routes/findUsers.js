const {Router} = require('express');
const User = require('../models/User');

const router = new Router();

router.post('/', async (req, res) => {
    try {
        const { userId } = req.user;
        const { reqEmail } = req.body;
        
        const foundUsers = await User.find({'email': { '$regex': reqEmail }, _id: { '$ne': userId } });

        return res.status(200).json({
            foundUsers
        });

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте еще раз' });
    }
});

module.exports = router;