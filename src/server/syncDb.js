var dataLayer = require('./dataLayer');
var values = require('lodash/values');

var syncs = values(dataLayer).map(entity => {
    if (typeof entity.sync === 'function') {
        return entity.sync({force: true})
    }

    return Promise.resolve();
});

var questions = [];

questions.push({
    text: "When was the french revolution?",
    answers: [
        { text: "1789", isCorrect: true },
        { text: "1337", isCorrect: false },
        { text: "2016", isCorrect: false },
        { text: "1314", isCorrect: false }
    ]
});

questions.push({
    text: "What is the robot model played by Arnold Schwarzenegger in the Terminator movies?",
    answers: [
        { text: "T-800", isCorrect: true },
        { text: "X-800", isCorrect: false },
        { text: "B-52", isCorrect: false },
        { text: "E-900", isCorrect: false }
    ]
});

questions.push({
    text: "Who was the drummer in the band Nirvana?",
    answers: [
        { text: "Dave Grohl", isCorrect: true },
        { text: "Kurt Cobain ", isCorrect: false },
        { text: "Neil Peart", isCorrect: false },
        { text: "Lars Ulrich", isCorrect: false }
    ]
});

function insertAnswers(questionId, answers) {
    return Promise.all(answers.map(answer => {
        return dataLayer.Answer.create({
            questionId: questionId,
            text: answer.text,
            isCorrect: answer.isCorrect
        });
    }));
}

function insertQuestion(question) {
    return dataLayer.Question.create({
        text: question.text
    }).then(entity => {
        return insertAnswers(entity.getDataValue('id'), question.answers);
    });
}

function insertQuestions(questions) {
    return Promise.all(questions.map(question => insertQuestion(question)));
}


Promise.all(syncs)
    .then(() => insertQuestions(questions))
    .then(() => dataLayer.sync())
    .then(() => {
        console.log('Done');
        process.exit();
    })
    .catch(console.error.bind(console));