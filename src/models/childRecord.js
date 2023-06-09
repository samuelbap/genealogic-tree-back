// childRecord.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const childRecord = sequelize.define('childRecord', {
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



childRecord.associate = function(models) {

  childRecord.belongsTo(models.person, {
    foreignKey: 'idPerson',
    as: 'child',
    allowNull: false
  }),
  
  childRecord.belongsTo(models.document, {
    foreignKey: 'idDocument',
    as: 'recordDocument',
    allowNull: false
  }),
  
  childRecord.belongsTo(models.partnership, {
    foreignKey: 'idPartnership',
    as: 'parentsPartnership',
    allowNull: false
  })
  

};
