'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {}
  }
  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      createdAt: {
        type: 'DATETIME',
        defaultValue: new Date(),
      },
      updatedAt: {
        type: 'DATETIME',
        defaultValue: new Date(),
      },
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};
