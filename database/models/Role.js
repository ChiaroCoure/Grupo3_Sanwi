/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types').DataTypes} dataTypes 
 */

module.exports = (sequelize, dataTypes) => {
  let alias = 'Role';
  let cols = {
    id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING(255),
      allowNull: false
    },    
  };

  let config = {
    timestamps: false,
    deletedAt: false
  }

  const Role = sequelize.define(alias, cols, config);

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      as: 'users',
      foreignKey: 'role_id'
    })
  }

  return Role
};