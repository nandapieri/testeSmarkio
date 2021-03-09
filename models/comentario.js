const Sequelize = require('sequelize');
const database = require('../db');

const Comentario = database.define("comentarios", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    texto: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = Comentario;
