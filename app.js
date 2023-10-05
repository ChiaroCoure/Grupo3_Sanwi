const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride =  require('method-override');
const path = require('path');
const mainRouter = require('./routers/main');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const rememberMe = require('./middlewares/rememberMe');

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, './public')));   
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'sanwi cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(cookieParser());
app.use(rememberMe);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
})


// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
// app.use((req, res, next) => next(createError(404)));

// // ************ error handler ************
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.path = req.path;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
