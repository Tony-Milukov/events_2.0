const {DataTypes} = require("sequelize")
const Sequelize = require('../db.ts');

const User = Sequelize.define("user", {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    email: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        default: false
    },
    // image: {
    //     type: DataTypes.STRING,
    //     default: "default.svg"
    // },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
})
module.exports = User
export {}