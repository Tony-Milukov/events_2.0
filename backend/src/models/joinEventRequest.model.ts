const sequelize = require("../db.ts")
const  {DataTypes} = require("sequelize")
module.exports = sequelize.define("joinEventRequest", {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: DataTypes.BOOLEAN
})
export {}