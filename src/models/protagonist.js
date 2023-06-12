import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const protagonist = sequelize.define('protagonist', {
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
  }
});

protagonist.associate = function (models) {

  protagonist.belongsTo(models.person, {
    foreignKey: 'idPerson',
    allowNull: false
  }),

  protagonist.belongsTo(models.document, {
    foreignKey: 'idDocument',
    allowNull: false
  })

};
