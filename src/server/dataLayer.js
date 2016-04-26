var uri = 'mongodb://localhost:27017/trivia';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt-nodejs');

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

var answerSchema = mongoose.Schema({
    text: String,
    isCorrect: Boolean
});

var questionSchema = mongoose.Schema({
    text: String,
    answers: [{ type: mongoose.Schema.ObjectId, ref: 'Answer' }]
});

var Answer = mongoose.model('Answer', answerSchema);
var Question = mongoose.model('Question', questionSchema);


module.exports = {
    User,
    Answer,
    Question
};