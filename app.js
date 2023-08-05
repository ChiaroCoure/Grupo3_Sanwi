const express=require('express');
const app=express();
const path=require('path');
app.use(express.static('public'));

const port=3000;

app.listen(port, ()=>(console.log(`Server up: port:${port}`)));
app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./views/home.html'))
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

app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'))
})