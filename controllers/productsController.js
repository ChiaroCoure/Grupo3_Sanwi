const fs = require('fs');
const path = require('path');
const products = require("../dataBase/products.json");

const productsFilePath = path.join(__dirname, '..', 'dataBase', 'products.json');

const productsController = {
  productDetail: (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    const productSearch = products.find((product) => product.id === id);

    res.render('products/product-detail', { user, products, productSearch });
  },
  deleteProduct: (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    const filteredProducts = products.filter((product) => product.id !== id);

    fs.writeFileSync(productsFilePath, JSON.stringify(filteredProducts, null, 2));

    const parsedProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    const productsWithDiscount = parsedProducts.filter((product) => product.discount > 0)

    res.render('products/product-list', {
      user,
      products: parsedProducts,
      offers: productsWithDiscount  
    })

  },
  productEdit: (req, res) => {
    const user = req.session.user;
    const { id } = req.params;

    const productSearch = products.find((product) => product.id === id);

    res.render('products/product-edit-form', { user, product: productSearch });
  
  },
  productUpdate: (req, res) => {
    const user = req.session.user;
    const { id } = req.params;
    const { body: { name, price, description} } = req;

    const indexProduct = products.findIndex((product) => product.id === id);

    products[indexProduct] = {
      ...products[indexProduct],
      name,
      price,
      description    
    }

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    const parsedProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    const productsWithDiscount = parsedProducts.filter((product) => product.discount > 0)

    res.render('products/product-list', {
      user,
      products: parsedProducts,
      offers: productsWithDiscount  
    })
  
  },
  productList: (req, res) => {
    const user = req.session.user;
    const productsWithDiscount = products.filter((product) => product.discount > 0)

    res.render('products/product-list', {
      user,
      products,
      offers : productsWithDiscount
    });
  },
  redirect: (req, res) => {
    res.redirect('/');
  },
  loadSandwich: (req, res) => {
    const user = req.session.user;
    res.render('products/product-create-form', { user } );
  },
  createProduct: (req, res) => {
    const newProduct = {
      id:`${Date.now()}`,
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      price: req.body.price,
      img: req.file?.filename
    };
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products));
    res.redirect('/');
  },
  searchProduct: (req, res) => {
    const user = req.session.user;
    const { search } = req.query
    const productSearch = products.filter((product) => product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    res.render('products/results', {
      user,
      products: productSearch
    })
  }
}

module.exports = { productsController }