const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); //colocar caminho relativo ./ pq não é módulo
const cors = require('cors');
const path = require('path');
const app = express();

//req.query => acessar query params(para filtro)
//req.params => acessar route params (edição, delete)
//req.body => acessar o corpo da requisição (para criação, edição)
mongoose.connect('mongodb+srv://vitorfrota:vitorfrota@omnistack-6logi.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(cors()); // permite q qualquer aplicação use a api
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes);
app.listen(3333); // define porta para utilizar a aplicação