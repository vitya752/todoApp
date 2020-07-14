const authRouters = require('../routes/routes.auth');
const noteRouters = require('../routes/routes.note');
const settingsRouters = require('../routes/routes.settings');

module.exports = (app) => {
    app.use('/api/auth', authRouters);
    app.use('/api/note', noteRouters);
    app.use('/api/settings', settingsRouters);

    // const User = new UserControllers();
    // app.post('/api/auth/register', User.register);
    // app.post('/api/auth/login', User.login);
    // app.post('/api/note/add', NoteControllers.add);
};