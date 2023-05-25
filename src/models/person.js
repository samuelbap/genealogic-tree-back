// person.js
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

person.associate = function(models) {

  person.hasMany(models.protagonist, {
    foreignKey: 'idPerson',
    as: 'protagonisms',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),
  
  person.hasMany(models.childRecord, { 
    foreignKey: 'idPerson',
    as: 'children',
    allowNull: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),
  
  person.hasMany(models.document, {
    as: 'rootDocuments',
    foreignKey: 'rootPersonId'
  }),

  person.belongsToMany(models.document, {
    through: models.protagonist,
    foreignKey: 'idPerson',
    otherKey: 'idDocument',
    as: 'documents',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),

  person.hasMany(models.partner, { 
    foreignKey: 'idPerson',
    as: 'partners',
    allowNull: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),

  person.belongsToMany(models.partnership, {
    through: models.partner,
    foreignKey: 'idPerson',
    otherKey: 'idPartnership',
    as: 'couplePartnership',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

}