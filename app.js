const express = require('express');
const app = express();
const { router } = require('./routers/main');

const port = 3000;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
})