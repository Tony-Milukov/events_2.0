import {UserInterface} from "../interfaces/user.interface";

const {getUserByIdService} = require("../services/user.service.ts")
const apiError = require("../utilits/apiError.ts")

module.exports =  (roleTitle:string) => {
    return async (req:any, res:any, next:any) => {
        try {
            const user = await getUserByIdService(req.user.id) as UserInterface
            if(user.roles.some((i:any) => i.title === roleTitle)) {
               return next()
            } throw { errorMsg: "you dont have permission to do it!", status: 403 }
        } catch (e:any) {
            apiError(res,e.errorMsg, e.status)
        }
    }
}