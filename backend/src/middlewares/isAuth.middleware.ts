import {UserInterface} from "../interfaces/user.interface";

const {getUserByToken} = require("../services/user.service.ts")
const apiError = require("../utilits/apiError.ts")
const {User, JoinEventRequest} = require("../models/main.ts")
require('dotenv')
    .config({path: '../.env'});

const isAuthMiddleware = async (req: any, res: any, next: any) => {
    try {
        req.user = await getUserByToken(req, res) as UserInterface

        //getting roles by user model
        req.roles = await req.user.getRoles({raw: true})
        next()
    } catch (e:any) {
        apiError(res, e.errorMsg, e.status)
    }
}
module.exports = isAuthMiddleware;
export {}