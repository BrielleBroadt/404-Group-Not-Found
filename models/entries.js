const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Entries extends Model {}

Entries.init(
  {
    entry_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    per_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost_each: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'entries',
  }
);

module.exports = Entries;
