var Sequelize = require('sequelize');
var dataLayer = require('./dataLayer');

function createGame(inviterId, inviteeId, questions) {
    return dataLayer.Game.create({
        inviterId,
        inviteeId
    }).then((game) => {
        return Promise.all(questions.map(question => {
            return game.addQuestion(question)
        })).then(() => game);
    }).then((game) => {
        return {
            gameId: game.getDataValue('id'),
            gameState: game.getDataValue('state')
        };
    });
}

function getRandomQuestions() {
    return dataLayer.Question.findAll({
        order: [
            Sequelize.fn('RANDOM')
        ]
    })
}

function initGame(inviterId, inviteeId) {
    return getRandomQuestions()
        .then(list => list.slice(0, 10))
        .then(questions => createGame(inviterId, inviteeId, questions));
}

module.exports = {
    initGame
};

//initGame(1, 2);

dataLayer.Game.findById(1, {
    include: dataLayer.Question
}).then(data => {
    console.log(data);
});