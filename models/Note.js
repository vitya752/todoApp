const {Schema, model} = require('mongoose');

const schema = new Schema({
    text: {
        type: String,
        required: true
    },
    important: {
        type: Boolean,
        default: false,
        required: true
    },
    done: {
        type: Boolean,
        default: false,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = model('Note', schema);