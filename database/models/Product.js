/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types').DataTypes} dataTypes 
 */

module.exports = (sequelize, dataTypes) => {
  let alias = 'Product';
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
    price: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    stock: {
      type: dataTypes.INTEGER(10),
      allowNull: false
    },
    discount: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false
    },
  };

  let config = {
    timestamps: false,
    deletedAt: false
  }

  const Product = sequelize.define(alias, cols, config);

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: 'category_id', // La clave foránea en la tabla "products" que se asocia con "categories"
      as: 'category', // Alias para la relación
    });
  };

  return Product;
};