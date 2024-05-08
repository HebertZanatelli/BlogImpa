const Sequelize = require('sequelize');


// Conexão com DB MySQL
const connection = new Sequelize('blog', 'root', '159309', {
    host: "localhost",
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection