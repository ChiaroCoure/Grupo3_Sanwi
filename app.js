const express = require('express');
const app = express();
const mainRouter = require('./routers/main');
const productsRouter = require('./routers/products');

const port = 3000;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/', mainRouter);
app.use('/', productsRouter);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
})