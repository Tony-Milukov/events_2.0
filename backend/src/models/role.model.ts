const sequelize = require("../db.ts")
const {DataTypes} = require("sequelize")

module.exports = sequelize.define("role", {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

export {}