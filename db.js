/*
  Objeto de conexão com o banco de dados
*/

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mural', 'fernanda', 'fer1234%', {
    host: "localhost",
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;
