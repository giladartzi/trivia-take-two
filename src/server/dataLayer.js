var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

var sequelize = new Sequelize('postgres://postgres:1337@localhost:5432/trivia');

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
    }
});

module.exports = {
    User
};