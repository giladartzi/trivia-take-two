var dataLayer = require('../dataLayer');
var authenticate = require('./authenticate');

module.exports = {
    post: (req, res) => {
        var username = req.body.username,
            password = req.body.password;

        if (username && password) {
            dataLayer.User.create({
                username: username,
                password: password
            }).then(() => {
                authenticate.post(req, res);
            }).catch(ex => {
                res.status(400).json({
                    error: ex.errors[0].message
                });
            });
        }
        else {
            res.status(400).json({
                error: 'Please provide both username and password'
            });
        }
    }
};