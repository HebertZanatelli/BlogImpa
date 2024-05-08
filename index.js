const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

const cotegoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')

const Category = require('./categories/Category')
const Article = require('./articles/Article')
const { where } = require('sequelize')

// view engine
app.set('view engine', 'ejs')


//static
app.use(express.static('public'))


//body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//db
connection
    .authenticate()
    .then(() => {
        console.log('conectado db')
    }).catch((error) => {
        console.log(error)
    })

//rotas

app.use('/', cotegoriesController)
app.use('/', articlesController)

app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render('index', { articles: articles, categories: categories })

        })

    })
})

app.get('/:slug', (req, res) => {
    let slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render('article', { article: article, categories: categories })
            })
        } else {
            res.redirect('/')
        }
    }).catch(err => {
        console.log(err)
        res.redirect('/')
    })
})

app.get('/category/:slug', (req, res) => {
    let slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
    }).then(category => {
        if (category != undefined) {
            
            Category.findAll().then(categories => {
                res.render('index', {articles: category.articles, categories: categories})
            })

        } else {
            res.redirect('/')
        }
    }).catch(err => {
        console.log(err)
        res.redirect('/')
    })
})

app.listen(8081, () => {
    console.log("rodando servidor")
})