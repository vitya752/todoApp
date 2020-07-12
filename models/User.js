const {Schema, model} = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String
    },
    avatar: {
        type: String
    }
},
{
    timestamps: true
    //добавляет поля created_at & updated_at
});

module.exports = model('User', schema);