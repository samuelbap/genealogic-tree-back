// partnership.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const partnership = sequelize.define('partnership', {
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

partnership.associate = function(models) {

  partnership.hasMany(models.childRecord, {
    foreignKey: 'idPartnership',
    as: 'childRecords',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),

  partnership.belongsTo(models.document, {
    foreignKey: 'idDocument',
    as: 'document',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),

  partnership.belongsToMany(models.person, {
    through: models.partners,
    foreignKey: 'idPartnership',
    otherKey: 'idPerson',
    as: 'personPartners',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),

  partnership.hasMany(models.partners, {
    foreignKey: 'idPartnership',
    as: 'partnerRecords',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }),

  partnership.belongsToMany(models.person, {
    through: models.childRecord,
    foreignKey: 'idPartnership',
    otherKey: 'idPerson',
    as: 'children',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

}
