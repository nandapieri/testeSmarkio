'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comentarios.init({
    id: { type: DataTypes.INTEGER, primaryKey: true },
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comentarios',
    underscored: true,
  });
  return Comentarios;
};
