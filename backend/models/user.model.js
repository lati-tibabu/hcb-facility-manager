'use strict';
const {  Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { UserRole } = require('../constants/enums.constant');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type:DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4  
    },
    username: {
      type:DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isLowercase: true,
        len: [3, 256]
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false
    },
    role: {
      type:DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false
    },
    email: {
      type:DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [10, 256] // Length between 10 and 15 characters
      }
    },
    isActive: {
      type:DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });

  User.beforeCreate(async (user) => {
    // You can add logic here before a user is created, e.g., hashing the password
    user.password = await bcrypt.hash(user.password, 10);
    const randomString = Math.random().toString(36).substring(2, 7);
    user.username = `${user.name.toLowerCase().replace(/\s+/g, '')}${randomString}`;
  });

  return User;
};