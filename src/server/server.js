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

var availability = require('./actions/availability');
app.post('/availability', availability.post);

var invite = require('./actions/invite');
app.post('/invite', invite.post);

var acceptInvitation = require('./actions/acceptInvitation');
app.post('/acceptInvitation', acceptInvitation.post);

var port = 8080;
var server = http.createServer(app);
var wsServer = new ws.Server({ server: server });
server.listen(port, function () { console.log('Listening on port', port); });
wsServer.on('connection', wsManager.initWebSocket);