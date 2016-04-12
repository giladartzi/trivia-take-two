var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var cors = require('cors');
var bcrypt = require('bcrypt-nodejs');

const SECRET = '4a3e853f-72ca-474f-b92a-5045e21794cb';

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
app.listen(port, function () {
    console.log('Listening on port', port);
});