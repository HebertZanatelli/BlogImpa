const Sequelize = require('sequelize');


// Conexão com DB MySQL
const sequelize = new Sequelize('postapp', 'root', '159309', {
    host: "localhost",
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}