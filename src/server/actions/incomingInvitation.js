var utils = require('../utils');
var dataLayer = require('../dataLayer');
var wsManager = require('../wsManager');
var pick = require('lodash/pick');

function handleAcceptInvitation(decoded, req, res) {
    var inviterId = req.body.inviterId,
        inviteeId = decoded.id;

    dataLayer.Game.create({
        inviterId,
        inviteeId
    }).then((game) => {
        let payload = {
            gameId: game.getDataValue('id'),
            gameState: game.getDataValue('state')
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
        inviteeId = decoded.id,
        options = {},
        values = {};

    values.state = 'AVAILABLE';
    options.where = { id: [inviterId, inviteeId] };

    dataLayer.User.update(values, options)
        .then(() => {
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