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
  removeProduct: async function (req, res) {
    const { id } = req.params;

    await db.Product.destroy({
      where: {
        id
      }
    })

    res.status(200).json({ message: 'Product deleted successfully' });
  },
  updateProduct: async function (req, res) {
    const { id } = req.params;
    console.log('req.file', req.file);
    await db.Product.update(
      { 
        ...req.body,
        image: req.file?.filename,
        categories_id: req.body.category,
      },
      {
        where: { id },
      }
    )

    res.status(200).json({ message: 'Product updated successfully' });
      
  },
  getProduct: async function (req, res) {
    const { id } = req.params;
    const product = await db.Product.findByPk(id, {
      include: [
        {
          association: 'category',
          attributes: ['id', 'name']
        }
      ]
    });
    res.status(200).json({
      ...product.dataValues,
      image: `http://localhost:3000/img/products/${product.image}`
    });
  }
}

module.exports = productApiController;