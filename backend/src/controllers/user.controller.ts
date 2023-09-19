import {UserInterface} from "../interfaces/user.interface";
import {RatingInterface} from "../interfaces/rating.interface";

const apiError = require("../utilits/apiError.ts")
const {bodyValidator,paramValidator} = require("../utilits/validators/request.validator.ts")
const {loginService, registerService, rateUserService,getUserByIdService,getUserRatingService} = require("../services/user.service.ts")

const loginController = async (req: any, res: any) => {
    try {
        const email = bodyValidator(req, res, "email")
        const password = bodyValidator(req, res, "password")
        const token = await loginService(email, password)

        res.json({message: "successfully logged in", token}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const registerController = async (req: any, res: any) => {
    try {
        const email = bodyValidator(req, res, "email")
        const password = bodyValidator(req, res, "password")
        const token = await registerService(email, password)
        res.json({message: "successfully registered", token}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const rateUserController = async (req: any, res: any) => {
    try {
        const rating = bodyValidator(req, res, "rating") as number
        const userId = bodyValidator(req, res, "userId") as number
        const user = req.user as UserInterface

        //check if userId is valid
        await getUserByIdService(userId)

        //check if int is in range of 1-5
        rating > 5 || rating < 1 ?  res.json({errorMsg: "rating must be an integer between 1-5"}) : null
        await rateUserService(rating, user, userId)

        res.json({message: `successfully rated user with userId: ${userId}, rated with: ${rating}`}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const getUserRatingController = async (req: any, res: any) => {
    try {
        const userId = paramValidator(req, res, "userId")

        //proof does this user exist
        await getUserByIdService(userId)

        const userRating = await getUserRatingService (userId) as RatingInterface
        res.json(userRating).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const getUserByIdController = async (req: any, res: any) => {
    try {
        const userId = paramValidator(req, res, "userId")

        //proof does this user exist
        const user  =  await getUserByIdService(userId) as JSON

        res.json(user).status(200)
    } catch (e: any) {
        console.log(e)
        apiError(res, e.errorMsg, e.status)
    }
}
module.exports = {
    loginController,
    registerController,
    rateUserController,
    getUserRatingController,
    getUserByIdController
}
export {}