var utils = require('../utils');
var dataLayer = require('../dataLayer');
var wsManager = require('../wsManager');
var pick = require('lodash/pick');

function handleDenyInvitation(decoded, req, res) {
    var inviterId = req.body.inviterId,
        inviteeId = decoded.id,
        options = {},
        values = {};

    values.state = 'AVAILABLE';
    options.where = { id: [inviterId, inviteeId] };

    dataLayer.User.update(values, options)
        .then(() => {
            res.json({ success: true });
            wsManager.send(inviterId, {
                actionType: 'INVITATION_DENIED',
                payload: { success: true }
            });
        });
}

function post(req, res) {
    var token = req.headers.token;
    utils.jwtVerify(token, utils.SECRET)
        .then(decoded => handleDenyInvitation(decoded, req, res))
        .catch(() => res.sendStatus(403));
}

module.exports = {
    post
};