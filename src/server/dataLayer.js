var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

var sequelize = new Sequelize(process.env.postgresConnectionString);

var User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        set: function (value) {
            var salt = this.getDataValue('salt');
            this.setDataValue('password', bcrypt.hashSync(value, salt))
        }
    },
    salt: {
        type: Sequelize.STRING,
        defaultValue: () => bcrypt.genSaltSync()
    },
    state: {
        type: Sequelize.ENUM('OFFLINE', 'AVAILABLE', 'PENDING', 'IN_GAME'),
        defaultValue: 'OFFLINE'
    }
});

var Game = sequelize.define('game', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inviterId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    inviteeId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    state: {
        type: Sequelize.ENUM('ACTIVE', 'DONE', 'ON_HOLD'),
        defaultValue: 'ACTIVE'
    }
});

var Question = sequelize.define('question', {
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

var Answer = sequelize.define('answer', {
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

var GameQuestion = sequelize.define('gameQuestion', {
    state: {
        type: Sequelize.ENUM('ANSWERED', 'UNANSWERED'),
        defaultValue: 'UNANSWERED'
    }
});

Question.hasMany(Answer);
Answer.belongsTo(Question);
Question.belongsToMany(Game, { through: 'GameQuestion' });
Game.belongsToMany(Question, { through: 'GameQuestion' });

function sync() {
    return sequelize.sync();
}

module.exports = {
    User,
    Game,
    Question,
    Answer,
    GameQuestion,
    sync
};