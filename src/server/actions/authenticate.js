var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var dataLayer = require('../dataLayer');

const SECRET = '4a3e853f-72ca-474f-b92a-5045e21794cb';

function post(req, res) {
    var username = req.body.username,
        password = req.body.password;

    if (username && password) {
        dataLayer.User.findOne({ where: { username: username } })
            .then((user) => {
                bcrypt.hash(password, user.salt, null, function (err, hash) {
                    if (err || hash !== user.password) {
                        res.status(403).json({
                            error: 'Bad username or password'
                        });
                    }
                    if (hash === user.password) {
                        jwt.sign({ id: user.id, username: username }, SECRET, null, function(token) {
                            res.json({
                                id: user.id,
                                username: username,
                                token: token
                            });
                        });
                    }
                })
                
            })
            .catch(() => {
                res.status(403).json({
                    error: 'Bad username or password'
                });
            });
    }
    else {
        res.status(400).json({
            error: 'Please provide both username and password'
        });
    }
}

module.exports = {
    post: post
};