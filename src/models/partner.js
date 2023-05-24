// partner.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const partner = sequelize.define('partner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

partner.associate = function(models) {
  partner.belongsTo(models.partnership, {
    foreignKey: 'idPartnership',
    as: 'partnership',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  partner.belongsTo(models.person, {
    foreignKey: 'idPerson',
    as: 'person',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};