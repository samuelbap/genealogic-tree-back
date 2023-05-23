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
  
  person.hasMany(models.partnership, { 
    foreignKey: 'partner1',
    as: 'partnerships_',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),
  
  person.hasMany(models.partnership, { 
    foreignKey: 'partner2',
    as: '_partnerships',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),
  
  person.hasMany(models.childRecord, { 
    foreignKey: 'idChild',
    as: 'is_children',
    allowNull: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),
  
  person.belongsToMany(models.document, {
    through: models.protagonist,
    foreignKey: 'idPerson',
    otherKey: 'idDocument',
    as: 'documents',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),

  person.belongsToMany(models.partnership, {
    through: models.childRecord,
    foreignKey: 'idChild',
    otherKey: 'idPartnership',
    as: 'parentPartnerships',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
}
