const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('resposta',{
    id :{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    corpo :{
        type: Sequelize.TEXT,
        allowNull : false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull : false
    }


});

Resposta.sync({force: false});

module.exports = Resposta;