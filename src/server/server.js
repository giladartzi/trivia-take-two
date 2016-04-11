var express = require('express');
var compression = require('compression');

var app = express();
app.use(compression());

app.get('/test', (req, res) => {
    res.send('Good');
});

var port = 8080;
app.listen(port, function () {
    console.log('Listening on port', port);
});