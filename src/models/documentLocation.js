import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const documentLocation = sequelize.define('documentLocation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  country: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  locState: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  municipality: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  parish: {
    type: DataTypes.STRING(255),
    // allowNull: false
  },
  institution: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  idBook: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()')
  }
});

documentLocation.associate = function (models) {

  documentLocation.hasMany(models.document, {
    foreignKey: 'idLocation',
    as: 'documents'
  })

};
