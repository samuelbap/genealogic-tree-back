import {sequelize} from '../config/database.js';
import {Person} from './person.js';
import {Document} from './document.js';
import {partnership} from './partnership.js';

export const children = sequelize.define('children', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

children.belongsTo(Person, {
  foreignKey: 'idChildren',
  as: 'child'
});

children.belongsTo(Document, {
  foreignKey: 'idDocument',
  as: 'document'
});

children.belongsTo(partnership, {
  foreignKey: 'idPartnership',
  as: 'partnership'
});


