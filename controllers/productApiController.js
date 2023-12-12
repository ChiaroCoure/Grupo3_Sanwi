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

  }
}

module.exports = productApiController;