var dataLayer = require('../dataLayer');
var authenticate = require('./authenticate');

module.exports = {
    post: (req, res) => {
        var username = req.body.username,
            password = req.body.password;

        if (username && password) {
            var user = new dataLayer.User({
                username: username,
                password: password
            });
            
            user.save().then(() => {
                authenticate.post(req, res);
            }).catch(ex => {
                res.status(400).json({
                    error: ex.message
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