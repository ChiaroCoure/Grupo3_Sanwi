const express=require('express');
const app=express();
const path=require('path');
app.use(express.static('public'));

const port=3000;

app.listen(port, ()=>(console.log(`Server up: port:${port}`)));
app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./views/home.html'))
})

app.post("/", (req, res) => {
    res.redirect("/product-detail")
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'))
})
app.post('/register',  (req,  res) =>{
    res.redirect('/');
})
app.get('/billing', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/billing.html'))
})
app.post('/billing',  (req,  res) =>{
    res.redirect('/');
})

app.get('/product-detail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/product-detail.html'))
})

app.get('/products-cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/products-cart.html'))
})

app.get('/load-sandwich', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/load-sandwich.html'))
})
app.post('/load-sandwich',  (req,  res) =>{
    res.redirect('/');
})