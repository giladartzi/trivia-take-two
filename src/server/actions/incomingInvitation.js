var utils = require('../utils');
var dataLayer = require('../dataLayer');
var gameUtils = require('../gameUtils');
var wsManager = require('../wsManager');
var pick = require('lodash/pick');

function updateUsersState(inviterId, inviteeId, state) {
    return dataLayer.User.where({
        _id: { $in: [inviterId, inviteeId] }
    }).update({
        state: state
    });
}

function handleAcceptInvitation(decoded, req, res) {
    var inviterId = req.body.inviterId,
        inviteeId = decoded.id;

    updateUsersState(inviterId, inviteeId, 'IN_GAME')
        .then(() => gameUtils.createGame(inviterId, inviteeId))
        .then(game => {
            var payload = {
                gameId: game.id,
                gameState: game.state
            };

            res.json(payload);

            wsManager.send(inviterId, {
                actionType: 'OUTGOING_INVITATION_ACCEPTED',
                payload
            });
        });
}

function handleDenyInvitation(decoded, req, res) {
    var inviterId = req.body.inviterId,
        inviteeId = decoded.id;

    updateUsersState(inviterId, inviteeId, 'AVAILABLE').then(() => {
        res.json({ success: true });
        wsManager.send(inviterId, {
            actionType: 'OUTGOING_INVITATION_REJECTED',
            payload: { success: true }
        });
    });
}

function handleInvitationReply(decoded, req, res) {
    var accepted = req.body.accepted;

    if (accepted) {
        return handleAcceptInvitation(decoded, req, res);
    }
    else {
        return handleDenyInvitation(decoded, req, res);
    }
}

function post(req, res) {
    var token = req.headers.token;
    utils.jwtVerify(token, utils.SECRET)
        .then(decoded => handleInvitationReply(decoded, req, res))
        .catch(() => res.sendStatus(403));
}

module.exports = {
    post
};