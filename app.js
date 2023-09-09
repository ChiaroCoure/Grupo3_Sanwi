const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require('./routers/main');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const methodOverride =  require('method-override');
const port = 3000;

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, './public')));   // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
/* app.use(logger('dev')); */
app.use(express.json());
/* app.use(cookieParser()); */
/* app.use(methodOverride('_method')); */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(methodOverride('_method'));

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
