var utils = require('../utils');
var dataLayer = require('../dataLayer');
var wsManager = require('../wsManager');
var pick = require('lodash/pick');

function handleAcceptInvitation(decoded, req, res) {
    var inviterId = req.body.inviterId,
        inviteeId = decoded.id;

    res.json({ success: true });
    
    wsManager.send(inviterId, {
        actionType: 'INVITATION_ACCEPTED',
        payload: { success: true }
    });
}

function post(req, res) {
    var token = req.headers.token;
    utils.jwtVerify(token, utils.SECRET)
        .then(decoded => handleAcceptInvitation(decoded, req, res))
        .catch(() => res.sendStatus(403));
}

module.exports = {
    post
};