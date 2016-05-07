var uri = 'mongodb://localhost:27017/trivia';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt-nodejs');
var random = require('mongoose-random');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

mongoose.connect(uri, function () {
    //mongoose.connection.db.dropDatabase();
});

var userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    salt: String,
    state: { type: String, enum: ['OFFLINE', 'AVAILABLE', 'PENDING', 'IN_GAME'], default: 'OFFLINE' }
});

userSchema.pre('save', function (next) {
    var salt = bcrypt.genSaltSync();
    this.salt = salt;
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

userSchema.plugin(uniqueValidator, {
    message: '{PATH} x {VALUE} x {TYPE}'
});

userSchema.set('toJSON', {
    virtuals: true
});

var User = mongoose.model('User', userSchema);

var answer = {
    text: String,
    isCorrect: Boolean
};

var question = {
    text: String,
    answers: [answer]
};

var questionSchema = mongoose.Schema(question);

questionSchema.plugin(random);

var Question = mongoose.model('Question', questionSchema);

var answerMetaData = {
    metaData: [{
        user: { type: mongoose.Schema.ObjectId, ref: 'User' },
        question: question,
        isAnswered: Boolean,
        isCorrect: Boolean,
        timing: Number
    }]
};

var gameSchema = mongoose.Schema({
    questions: [question],
    state: { type: String, enum: ['ACTIVE', 'INACTIVE'] },
    numberOfQuestions: Number,
    currentQuestion: {
        answered: [Boolean],
        index: Number
    },
    players: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    answers: [answerMetaData]


});

gameSchema.plugin(deepPopulate);

var Game = mongoose.model('Game', gameSchema);

module.exports = {
    User,
    Question,
    Game
};