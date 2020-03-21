const sequelise = require("sequelize");

const connection = new sequelise('ask','root','',{
    host: 'localhost',
    port : '3308',
    dialect : 'mysql'
}); 

module.exports = connection;