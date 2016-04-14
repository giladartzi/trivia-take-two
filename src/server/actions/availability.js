var utils = require('../utils');
var dataLayer = require('../dataLayer');
var wsManager = require('../wsManager');

function getAvailableUsers(exclude) {
    return dataLayer.User.findAll({
        attributes: ['id', 'username', 'state'],
        where: {
            state: 'AVAILABLE',
            id: {
                $not: exclude
            }
        }
    });
}

function handleAvailability(decoded, res) {
    var options = {},
        values = {},
        user = { id: decoded.id, username: decoded.username };

    values.state = 'AVAILABLE';
    options.where = { id: user.id };

    dataLayer.User.update(values, options)
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
        });
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