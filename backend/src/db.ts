const { Sequelize } = require('sequelize');

module.exports = new Sequelize(process.env.DB_CONNECT_LINK, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
export {};