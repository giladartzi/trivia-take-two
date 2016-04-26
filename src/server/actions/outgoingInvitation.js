var utils = require('../utils');
var dataLayer = require('../dataLayer');
var wsManager = require('../wsManager');
var pick = require('lodash/pick');

function verifyUser(user) {
    if (user.getDataValue('state') !== 'AVAILABLE') {
        throw new Error('User is not available');
    }

    return user;
}

function inviteUser(inviter, invitee, res) {
    // Update user(s) to PENDING
    var options = {},
        values = {};

    values.state = 'PENDING';
    options.where = { id: [inviter.id, invitee] };
    options.returning = true;

    dataLayer.User.update(values, options)
        .then(() => {
            res.json({ success: true });
            wsManager.send(invitee, {
                actionType: 'INCOMING_INVITATION_RECEIVED',
                payload: { inviter: inviter }
            });
        });
}

function handleOutgoingInvitation(decoded, req, res) {
    var inviter = pick(decoded, ['id', 'username']),
        invitee = req.body.invitee;

    dataLayer.User.findById(invitee.id)
        .then(verifyUser)
        .then(() => inviteUser(inviter, invitee.id, res))
        .catch(error => res.status(400).json({ error: error.message }))

}

function post(req, res) {
    var token = req.headers.token;
    utils.jwtVerify(token, utils.SECRET)
        .then(decoded => handleOutgoingInvitation(decoded, req, res))
        .catch(() => res.sendStatus(403));
}

module.exports = {
    post
};