/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types').DataTypes} dataTypes 
 */

module.exports = (sequelize, dataTypes) => {
  let alias = 'User';
  let cols = {
    id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    email: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    username: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    image: {
      type: dataTypes.STRING(255),
      allowNull: false
    } 
  };

  let config = {
    timestamps: false,
    deletedAt: false
  }

  const User = sequelize.define(alias, cols, config);

  User.associate = (models) => {
    User.belongsTo(models.Role, {
      as: 'role', // Alias para la relación
      foreignKey: 'role_id', // La clave foránea en la tabla "users" que se asocia con "roles"
    });
  };

  return User
};