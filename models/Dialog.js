const {Schema, model} = require('mongoose');

const schema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    unreadMessages: {
        type: Schema.Types.Number
    }
});

module.exports = model('Dialog', schema);