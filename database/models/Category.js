/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types').DataTypes} dataTypes 
 */

module.exports = (sequelize, dataTypes) => {
  let alias = 'Category';
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
    }    
  };

  let config = {
    timestamps: false,
    deletedAt: false
  }

  const Category = sequelize.define(alias, cols, config);

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: 'category_id', // La clave foránea en la tabla "products" que se asocia con "categories"
      as: 'products', // Alias para la relación
    });
  };

  return Category;
};