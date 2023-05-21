import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

import { person } from './person.js';
import { document } from './document.js';

export const protagonist = sequelize.define('protagonist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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

protagonist.belongsTo(person, {
  foreignKey: 'idPerson',
  as: 'person',
  allowNull: false
});

protagonist.belongsTo(document, {
  foreignKey: 'idDocument',
  as: 'document',
  allowNull: false
});
