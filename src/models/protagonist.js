import { sequelize } from '../config/database.js';
import { person } from './person.js';
import { document } from './document.js';

export const protagonist = sequelize.define('protagonist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

protagonist.belongsTo(person, {
  foreignKey: 'idPerson',
  as: 'person'
});

protagonist.belongsTo(document, {
  foreignKey: 'idDocument',
  as: 'document'
});
