const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const Post = require('./models/Post')

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Rotas
app.get('/', function (req, res) {
    Post.findAll().then(function (posts) {
        res.render('home', { posts: posts })
    })
});

app.get('/cad', function (req, res) {
    res.render('formulario');
});
app.post('/add', function (req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
    }).then(function () {
        res.redirect('/')
    }).catch(function (erro) {
        res.send('Houve um erro: ' + erro)
    })
})

app.get('/deletar/:id', function (req, res) {
    Post.destroy({ where: { 'id': req.params.id } }).then(function () {
        res.send('Postagem deletada com sucesso!')
    }).catch(function (erro) {
        res.send('essa postagem não existe!')
    })
})

app.listen(8081, function () {
    console.log("Servidor rodando na URL http://localhost:8081");
});
