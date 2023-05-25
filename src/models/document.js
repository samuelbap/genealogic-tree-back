// document.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

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

document.associate = function (models) {

  document.belongsTo(models.documentLocation, {
    foreignKey: 'idLocation',
    as: 'location',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),
  
  document.belongsTo(models.person, {
    foreignKey: 'rootPersonId',
    as: 'rootPerson',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),

  document.hasMany(models.protagonist, {
    foreignKey: 'idDocument',
    as: 'protagonies'
  }),

  document.belongsToMany(models.person, {
    through: models.protagonist,
    foreignKey: 'idDocument',
    otherKey: 'idPerson',
    as: 'protagonists',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
};
