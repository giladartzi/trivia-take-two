var utils = require('../utils');
var dataLayer = require('../dataLayer');
var wsManager = require('../wsManager');

function getAvailableUsers(exclude) {
    var criteria = {
        state: 'AVAILABLE',
        _id: {
            $ne: exclude
        }
    };

    var fields = 'id username';
    
    return dataLayer.User.find(criteria, fields);
}

function handleAvailability(decoded, res) {
    var options = {},
        values = {},
        user = { id: decoded.id, username: decoded.username };

    dataLayer.User.findOneAndUpdate({ _id: user.id }, { state: 'AVAILABLE' })
        .then(() => getAvailableUsers(user.id))
        .then(availableUsers => {
            var message;

            // Send the user the current state,
            // plus the initial list of available users
            res.json({
                state: values.state,
                availableUsers: availableUsers
            });

            message = {
                actionType: 'AVAILABLE_USER',
                payload: { user: user }
            };

            // Inform all other users that a new user is available
            wsManager.broadcast(message, user.id);
        }).catch(console.error.bind(console));
}

function post(req, res) {
    var token = req.headers.token;
    utils.jwtVerify(token, utils.SECRET)
        .then(decoded => handleAvailability(decoded, res))
        .catch(() => res.sendStatus(403));
}

module.exports = {
    post
};