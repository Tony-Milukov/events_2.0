const {DataTypes} = require("sequelize")
const Sequelize = require('../db.ts');

module.exports = Sequelize.define("event", {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startLocation: {
        type: DataTypes.STRING,
        allowNull: true
    }, endLocation: {
        type: DataTypes.STRING,
        allowNull: false
    }, links: {
        type: DataTypes.JSON,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
})
export {}
