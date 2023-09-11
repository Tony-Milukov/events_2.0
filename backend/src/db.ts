const { Sequelize } = require('sequelize');

module.exports = new Sequelize("postgres://root:YA2v8kHYJb9BveW5n9RAsxF8YxkLTn5S@dpg-cjve37nhdsdc73dsn1qg-a.frankfurt-postgres.render.com/events_gngx", {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
export {};