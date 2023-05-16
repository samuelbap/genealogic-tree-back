import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

import { person } from './person.js';
import { document } from './document.js';
import { partnership } from './partnership.js';

export const children = sequelize.define('children', {
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

children.belongsTo(person, {
  foreignKey: 'idChildren',
  as: 'child'
});

children.belongsTo(document, {
  foreignKey: 'idDocument',
  as: 'document'
});

children.belongsTo(partnership, {
  foreignKey: 'idPartnership',
  as: 'partnership'
});
