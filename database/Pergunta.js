const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    titulo:{
        type : Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type : Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force:false}).then(()=>{});

module.exports = Pergunta;