var utils = require('../utils');
var dataLayer = require('../dataLayer');

function handleAnswer(decoded, res) {
    // get game
    
    // update user answer
}

function post(req, res) {
    var token = req.headers.token;
    utils.jwtVerify(token, utils.SECRET)
        .then(decoded => handleAnswer(decoded, res))
        .catch(() => res.sendStatus(403));
}

module.exports = {
    post
};