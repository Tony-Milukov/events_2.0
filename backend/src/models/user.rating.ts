const {DataTypes} = require("sequelize")
const Sequelize = require('../db.ts');

module.exports = Sequelize.define("userRating", {
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            max: 5,
            min: 1
        },
        allowNull: true
    },
    userRatedId: {
        allowNull: false,
        type: DataTypes.INTEGER
    }
})

export {}