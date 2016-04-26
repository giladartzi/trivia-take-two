var mongoose = require('mongoose');
var dataLayer = require('./dataLayer');

var uri = 'mongodb://localhost:27017/trivia';

function createAnswers(answers) {
    return Promise.all(answers.map(answer => new dataLayer.Answer(answer).save()));
}

function createQuestion(question, answers) {
    question.answers = answers;
    return new dataLayer.Question(question).save();
}

mongoose.connection.once('open', function() {
    mongoose.connection.db.dropDatabase();
    console.log('Database dropped');

    Promise.all(questions.map(question => {
        return createAnswers(question.answers)
            .then(answers => createQuestion(question, answers));
    })).then(() => process.exit(1));
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