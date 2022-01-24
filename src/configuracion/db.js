const sequelize = require('sequelize');
const db = new sequelize(
    'desofiw',
    'root',
    'luis1234',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'

    }
);

module.exports = db;