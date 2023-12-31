const db = require('../dataBase/models');
const { Product, Category } = db;

const productsController = {
  productDetail: (req, res) => {
    const { id } = req.params;

    Product.findByPk(id)
      .then((product) => {
        if (product) {
          Product.findAll()
            .then((products) => {
              res.render('products/product-detail', { productSearch: product, products });
            })
        } else {
          res.status(404).send('Producto no encontrado');
        }
      })
  },

  deleteProduct: (req, res) => {
    const { id } = req.params;

    Product.findByPk(id)
      .then((product) => {
        if (product) {
          return product.destroy();
        } else {
          res.status(404).send('Producto no encontrado');
        }
      })
      .then(() => {
        res.redirect('/products');
      })

  },

  productEdit: (req, res) => {
    const { id } = req.params;
   
    Product.findByPk(id)
      .then((product) => {
        if (product) {
          Category.findAll()
          .then((categories) => {
            res.render('products/product-edit-form', { product, categories });
          })
        } else {
          // Manejar el caso en que no se encuentra el producto
          res.redirect('/products');
        }
      })

  },

  productUpdate: (req, res) => {
    const { id } = req.params;
    Product.update(
      { 
        ...req.body,
        image: req.file?.filename,
        categories_id: req.body.category,
      },
      {
        where: { id },
      }
    )
      .then(() => {
        res.redirect('/products');
      });
  },

  productList: (req, res) => {

    const { limit = 5, page = 1 } = req.query;
    Product.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    })
      .then((products) => {
          Category.findAll()
          .then((categories) => {
            
            const totalPages = Math.ceil(products.count / Number(limit));
    
            const productsWithDiscount = products.rows.filter((product) => product.discount > 0);
            res.render('products/product-list', {
              offers: productsWithDiscount,
              products: products.rows,
              totalPages,
              currentPage: page, 
              categories
            })
            
          })
      })

    // Product.findAll()
    //   .then((products) => {
    //     const productsWithDiscount = products.filter((product) => product.discount > 0);
    //     res.render('products/product-list', {
    //       products,
    //       offers: productsWithDiscount
    //     });
    //   })
  },

  redirect: (req, res) => {
    res.redirect('/');
  },

  loadSandwich: (req, res) => {
    Category.findAll()
      .then((categories) => {
        res.render('products/product-create-form', { categories });
      })
  },

  createProduct: (req, res) => {
    const { name, category, description, price, stock, discount } = req.body;

    Product.create({
      name,
      categories_id: category,
      description,
      price,
      stock,
      discount,
      image: req.file?.filename,
    })
      .then(() => {
        res.redirect('/products');
      })
  },

  searchProduct: (req, res) => {
    const { search } = req.query;

    Product.findAll({
      where: {
        name: {
          [db.Sequelize.Op.like]: `%${search}%`
        }
      }
    })
      .then((products) => {
        res.render('products/results', {
          products: products
        });
      })
  },
  filterProduct: (req, res) => {
    const { category } = req.query;

    Product.findAll({
    })
      .then((products) => {
        Category.findAll()
        .then((categories) => {
          const categoryId= categories.filter((cat)=> cat.name == category);
          const filted= products.filter((product)=> product.categories_id == categoryId[0].dataValues.id)
          res.render('products/products-filter', {
            products: filted,
            categories
          });
        })
      })
  }
}

module.exports = { productsController }