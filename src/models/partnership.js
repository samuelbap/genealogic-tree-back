import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

import { person } from './person.js';
import { document } from './document.js';

export const partnership = sequelize.define('partnership', {
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

partnership.belongsTo(document, {
  foreignKey: 'idDocument',
  as: 'document',
  allowNull: false
});

partnership.belongsTo(person, {
  foreignKey: 'partner1',
  allowNull: false
});

partnership.belongsTo(person, {
  foreignKey: 'partner2',
  allowNull: false
});

// partnership.hasMany(children, {
//   foreignKey: 'idPartnership',
//   as: 'children'
// });

partnership.associate = function(models) {
  // Associations can be defined here
  person.hasMany(models.children, { foreignKey: 'idPartnership', as: 'Children' });
};