const { Schema, model } = require('mongoose');

const schema = new Schema({
    dialogId: {
        type: Schema.Types.ObjectId,
        ref: 'Dialog',
        required: true
    },
    read: {
        type: Boolean,
        default: false,
        required: true
    },
    text: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attachments: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    }
},
{
    timestamps: true
});

module.exports = model('Message', schema);