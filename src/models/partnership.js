import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

import { person } from './person.js';
import { document } from './document.js';

export const partnership = sequelize.define('partnership', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

partnership.belongsTo(document, {
  foreignKey: 'idDocument',
  as: 'document'
});

partnership.belongsTo(person, {
  foreignKey: 'partner',
  as: 'partner1'
});

partnership.belongsTo(person, {
  foreignKey: 'partner1',
  as: 'partner2'
});
