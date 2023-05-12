import sequelize from '../config/database.js';
import person from './person.js';
import document from './document.js';

const DocumentProtagonist = sequelize.define('documentProtagonist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

DocumentProtagonist.belongsTo(person, {
  foreignKey: 'idPerson',
  as: 'person'
});

DocumentProtagonist.belongsTo(document, {
  foreignKey: 'idDocument',
  as: 'document'
});

module.exports = DocumentProtagonist;
