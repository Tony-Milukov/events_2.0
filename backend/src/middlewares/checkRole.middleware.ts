
const {getUserByIdService, verifyUserRoleService} = require("../services/user.service.ts")
const apiError = require("../utilits/apiError.ts")

module.exports =  (roleTitle:string) => {
    return async (req:any, res:any, next:any) => {
        try {
            if(verifyUserRoleService(req.roles, roleTitle)) {
                return next()
            } res.json({ errorMsg: "you dont have permission to do it!"}).status(403)
        } catch (e:any) {
            apiError(res,e.errorMsg, e.status)
        }
    }
}