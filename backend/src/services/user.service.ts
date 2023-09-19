import {UserInterface} from "../interfaces/user.interface";
import {RatingInterface} from "../interfaces/rating.interface";

const sequelize = require("sequelize")
const {User, UserRating} = require("../models/main.ts")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const v4 = require("uuid").v4
require('dotenv')
    .config({path: '../.env'});
const loginService = async (email: string, password: string) => {
    //find user by email
    const user = await User.findOne({
        where: {email}
    })
    //if user is not defined and password is wrong
    if (!user || !await bcrypt.compare(password, await user.password)) {
        throw {errorMsg: "Email or password is incorrect", status: 401}
    }
    return jwt.sign({userId: user.id, username: user.username}, process.env.SECRET)
}
const registerService = async (email: string, password: string) => {
    //look if there is a user with that email address
    const user = await User.findOne({
        where: {
            email
        }
    })
    if (user) {
        throw {errorMsg: "user with that email address is already registered", status: 409}
    }
    const hash = await bcrypt.hash(password, 9)
    const newUser = await User.create({
        email,
        password: hash,
        username: `user_${v4()}`
    })
    //if user is not, he is not created, throw error
    if (!newUser) {
        throw {errorMsg: "something went wrong on creating a user", status: 400}
    }

    //generate jwt
    return jwt.sign({userId: newUser.id, username: newUser.username}, process.env.SECRET)

}
const getTokenService = (req: any) => {
    const rareToken = req.headers.authorization;
    if (!rareToken) {
        return false;
    }
    const token = rareToken.split(' ')[1];
    if (token) {
        return token;
    }
    return false;
};

const decodeJwtService = async (token: string) =>
    jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
            if (err) {
                return false;
            }
            return decoded;
        },
    );

const getUserRatingService = async (userId: number) => {
    const rating = await UserRating.findOne({
        where: {
            userId
        },
        attributes: [
            [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
            [sequelize.fn('COUNT', sequelize.col('*')), 'count']
        ]
    });
    if (rating) {
        return {
            rating: Math.round(rating.dataValues.averageRating),
            ratingsCount: Math.round(rating.dataValues.count),
        }
    }
    throw {errorMsg: "something went wrong on getting user rating", status: 200}
}
const getUserByIdService = async (userId: number) => {
    const user = await User.findByPk(userId);
    const userRating = await getUserRatingService(userId)
    if (!user) {
        throw {errorMsg: "Sorry, user with that userId was not defined", status: 404}
    }
    delete user.dataValues.password
    return {...user.dataValues, userRating}
}
const getUserByToken = async (req: any) => {
    const token = getTokenService(req);
    const decoded = await decodeJwtService(token);
    const user = await User.findByPk(decoded.userId);
    if (!token || !decoded || !user) {
        throw {errorMsg: 'Unauthorized!', status: 401};
    }

    return user;
};
const rateUserService = async (rating: number, user: UserInterface, userId: any) => {

    //check did user already rated this user
    const Rate = await UserRating.findAll({
        where: {
            userId: userId,
            userRatedId: user.id
        }
    })

    if (Rate[0]) {
        return await Rate[0].update({
            rating
        })
    }
    await UserRating.create({
        rating,
        userRatedId: user.id,
        userId
    })
}

module.exports = {
    loginService,
    registerService,
    getTokenService,
    decodeJwtService,
    getUserByToken,
    rateUserService,
    getUserByIdService,
    getUserRatingService
}
export {}