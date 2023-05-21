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
  // Associations can be defined here
  person.hasMany(models.protagonist, { foreignKey: 'idPerson', as: 'protagonisms' });
  person.belongsToMany(models.document, { through: models.protagonist, foreignKey: 'idPerson', as: 'documents' });
  person.hasMany(models.partnership, { foreignKey: 'partner1', as: 'partnerships_' });
  person.hasMany(models.partnership, { foreignKey: 'partner2', as: '_partnerships' });
  person.hasMany(models.children, { foreignKey: 'idChildren', as: 'children' });
  // person.belongsToMany(models.children, { through: models.partnership, foreignKey: 'partner1', as: 'children_' });
  // person.belongsToMany(models.children, { through: models.partnership, as: '_children' });
};