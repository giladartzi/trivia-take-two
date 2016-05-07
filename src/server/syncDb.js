var mongoose = require('mongoose');
var dataLayer = require('./dataLayer');

function createQuestion(question) {
    return new dataLayer.Question(question).save();
}

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
        { text: "Kurt Cobain", isCorrect: false },
        { text: "Neil Peart", isCorrect: false },
        { text: "Lars Ulrich", isCorrect: false }
    ]
});

mongoose.connection.once('open', function() {
    mongoose.connection.db.dropDatabase();
    console.log('Database dropped');

    Promise.all(questions.map(question => createQuestion(question)))
        .then(() => process.exit(1));
});