var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var cors = require('cors');
var http = require('http');
var ws = require('ws');
var wsManager = require('./wsManager');

var app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(cors());

app.get('/test', (req, res) => {
    res.send('Good');
});

var register = require('./actions/register');
app.post('/register', register.post);

var authenticate = require('./actions/authenticate');
app.post('/authenticate', authenticate.post);

var port = 8080;
var server = http.createServer(app);
var wsServer = new ws.Server({ server: server });
server.listen(port, function () { console.log('Listening on port', port); });
wsServer.on('connection', wsManager.initWebSocket);

setInterval(() => {
    wsManager.broadcast({
        actionType: 'INCOMING_MESSAGE',
        payload: {
            gilad: Math.random()
        }
    });
}, 1000);