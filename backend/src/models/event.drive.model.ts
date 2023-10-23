const {DataTypes} = require("sequelize")
const Sequelize = require('../db.ts');

module.exports = Sequelize.define("eventDrive", {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    driverId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true

    },
    description: {
        allowNull: true,
        type: DataTypes.STRING
    },

    allSeats: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    availableSeats: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
})

export {}
