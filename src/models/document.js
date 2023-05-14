import { sequelize } from '../config/database.js';
import { documentLocation } from './documentLocation.js';
import { person } from './person.js';

export const document = sequelize.define('document', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  documentType: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  eventLocation: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  issueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  imageNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING(300),
    allowNull: false
  }
});

Document.belongsTo(documentLocation, {
  foreignKey: 'locationId',
  as: 'location'
});

Document.belongsTo(person, {
  foreignKey: 'rootPersonId',
  as: 'rootPerson'
});