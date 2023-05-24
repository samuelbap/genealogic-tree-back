// partners.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const partners = sequelize.define('partners', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

partners.associate = function(models) {
  partners.belongsTo(models.partnership, {
    foreignKey: 'idPartnership',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  partners.belongsTo(models.person, {
    foreignKey: 'idPerson',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};