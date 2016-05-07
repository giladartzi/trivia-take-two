var utils = require('../utils');
var dataLayer = require('../dataLayer');

function handleGetQuestion(decoded, res) {
    // Get game by userId
    // Send current question

    /*dataLayer.Game.findOne({
        $or: [
            { inviter: decoded.id },
            { invitee: decoded.id }
        ]
    }).then(game => {
        res.json({
            question: game.inviterAnswers[0].question
        });
    }).catch(ex => {
        console.log(ex);
    });*/
}

function post(req, res) {
    var token = req.headers.token;
    utils.jwtVerify(token, utils.SECRET)
        .then(decoded => handleGetQuestion(decoded, res))
        .catch(() => res.sendStatus(403));
}

module.exports = {
    post
};