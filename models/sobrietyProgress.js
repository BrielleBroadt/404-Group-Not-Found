const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SobrietyProgress extends Model {}

SobrietyProgress.init(
  {
    progress_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    days_sober: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    money_saved: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
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
    modelName: 'sobriety_progress',
  }
);

module.exports = SobrietyProgress;
