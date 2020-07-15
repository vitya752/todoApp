const authRouters = require('../routes/auth');
const noteRouters = require('../routes/note');
const settingsRouters = require('../routes/settings');
const dialogsRouters = require('../routes/dialogs');
const messagesRouters = require('../routes/messages');
const auth = require('../middleware/auth.middleware');
const lastSeen = require('../middleware/lastSeen.middleware');

module.exports = (app, io) => {

    app.use(auth);
    app.use(lastSeen);

    app.use('/api/auth', authRouters);
    app.use('/api/note', noteRouters);
    app.use('/api/settings', settingsRouters);
    app.use('/api/dialogs', dialogsRouters);
    app.use('/api/messages', messagesRouters);

    // const User = new UserControllers();
    // app.post('/api/auth/register', User.register);
    // app.post('/api/auth/login', User.login);
    // app.post('/api/note/add', NoteControllers.add);
};