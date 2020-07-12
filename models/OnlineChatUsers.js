const {Schema, model} = require('mongoose');

const OnlineChatUsers = new Schema({
    _id: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('OnlineChatUsers', OnlineChatUsers);