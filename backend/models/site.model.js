'use strict';
const { Model, UUIDV4 } = require('sequelize');
const { Status } = require("../constants/enums.constant");

module.exports = (sequelize, DataTypes) => {
  class site extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  site.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(...Object.values(Status)),
      allowNull: false,
      defaultValue: Status.ACTIVE
    },
  }, {
    sequelize,
    modelName: 'Site',
    tableName: 'Sites'
  });
  return site;
};