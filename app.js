const express = require('express');
const keys = require('./keys');
const path = require('path');
const { createServer } = require('http');

const bdConnect = require('./core/db');
const createRoutes = require('./core/routes');
const createSocket = require('./core/socket');

const app = express();
const http = createServer(app);
const io = createSocket(http);

app.use(express.json({ extended: true }));

createRoutes(app, io);

const PORT = process.env.PORT || keys.PORT;

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const start = async () => {
    try {
        bdConnect(keys.MONGODB_URI);
        http.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(e) {
        console.log(e);
    }
};

start();

//todoapp-practice@ukr.net
//12345vitya