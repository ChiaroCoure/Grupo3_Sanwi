const db = require('../dataBase/models');

const productApiController = {
  getProducts: async function (req, res) {

    const products = await db.Product.findAll({
      include: [
        {
          association: 'category',
          attributes: ['id', 'name']
        }
      ]
    })
    const productsParsed = products.map(product => ({ ...product.dataValues, image: `http://localhost:3000/img/products/${product.image}` }))
    res.status(200).json(productsParsed);

  },
  lastProduct: async function (req, res) {

    const last = await db.Product.findOne({
      order: [['id', 'DESC']], // Ordena por id en orden descendente (DESC)
    });

    res.status(200).json({
      ...last.dataValues,
      image: `http://localhost:3000/img/products/${last.image}`
    });

  }

}
module.exports = productApiController;