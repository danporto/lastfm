const express = require('express') // const express recebe uma requisição do módulo express
const app = express() // app vai receber a função express de
const path = require('path') 
require('dotenv').config({
  path: path.resolve(__dirname, '.env')
})

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('../../', express.static(__dirname + 'public/'));

app.set('viwes', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
  res.render('pages/index', {text: 'Home Page'})
})

module.exports = app;

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Servidor Funcional, link: http://localhost:${port}`))







