var dataLayer = require('./dataLayer');
var NUMBER_OF_QUESTIONS = 3;

function getRandomQuestions(n) {
    return new Promise(function (resolve, reject) {
        dataLayer.Question.findRandom().limit(n).populate('answers').exec(function (err, questions) {
            if (err) {
                reject(err);
            }

            resolve(questions);
        });
    });
}

function generateMetaData(questions, userId) {
    return {
        metaData: questions.map(question => {
            return {
                user: userId,
                question: question,
                isAnswered: false,
                isCorrect: false,
                timing: Number.MAX_SAFE_INTEGER
            }
        })
    };
}

function generateGame(questions, inviterId, inviteeId) {
    var game = {
        questions: questions,
        state: 'ACTIVE',
        numberOfQuestions: NUMBER_OF_QUESTIONS,
        currentQuestion: {
            answered: [false, false],
            index: 0
        },
        players: [inviterId, inviteeId],
        answers: [
            generateMetaData(questions, inviterId),
            generateMetaData(questions, inviteeId)
        ]
    };
    
    return new dataLayer.Game(game).save();
}

function createGame(inviterId, inviteeId) {
    return getRandomQuestions(NUMBER_OF_QUESTIONS)
        .then(questions => generateGame(questions, inviterId, inviteeId));
}

module.exports = {
    createGame
};