'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSiteAssignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "assignee"
      });

      this.belongsTo(models.Site, {
        foreignKey: "siteId",
        as: "site"
      });

      // this.belongsTo(models.User, {
      //   foreignKey: "assignedBy",
      //   as: "assigner"
      // });
    }
  }
  UserSiteAssignment.init({
    id: { 
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: { 
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    siteId: { 
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Site',
        key: 'id'
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    // assignedBy: { 
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: 'User',
    //     key: 'id'
    //   },
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE"
    // }
  }, {
    sequelize,
    modelName: 'UserSiteAssignment',
    tableName: 'UserSiteAssignments'
  });
  return UserSiteAssignment;
};