const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
const mainRouter = require('./routers/main');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const usersApiRouter = require('./routers/usersApi');
const productApiRouter = require('./routers/productsApi');
const categoriesRouter = require('./routers/categoriesApi');
const userLogged = require('./middlewares/userLogged');
const cors = require('cors');

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'sanwi cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(cookieParser());
app.use(userLogged);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/products', productApiRouter);
app.use('/api/categories', categoriesRouter);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
})