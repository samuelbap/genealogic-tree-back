import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const person = sequelize.define('person', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: true
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
