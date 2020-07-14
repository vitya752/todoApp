const mongoose = require('mongoose');

module.exports = async (uri) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    err => {
        if(err) {
            console.log(err);
        }
        return;
    });
};