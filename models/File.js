const { Schema, model } = require('mongoose');

const schema = new Schema({
    filename: String,
    size: Number,
    ext: String,
    url: String,
    message: { 
        type: Schema.Types.ObjectId, 
        ref: "Message", 
        require: true 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        require: true 
    }
},
{
    timestamps: true,
});

module.exports = model('File', schema);