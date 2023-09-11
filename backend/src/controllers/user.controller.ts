const apiError = require("../utilits/apiError.ts")
const {bodyValidator}  = require("../utilits/validators/request.validator.ts")
const {loginService, registerService} = require("../services/user.service.ts")

const loginController = async (req:any,res:any) => {
    try {
        const email = bodyValidator(req,res,"email")
        const password = bodyValidator(req,res,"password")
        const user = await loginService(email, password)
        req.session.auth = true
        res.json({message: "successfully logged in"}).status(200)
    } catch (e:any) {
        apiError(res, e.errorMsg)
        console.log(e)
    }
}
const registerController = async (req:any,res:any) => {
    try {
        const email = bodyValidator(req,res,"email")
        const password = bodyValidator(req,res,"password")
        await registerService(email,password)
        res.json({message: "successfully registered"}).status(200)
    } catch (e:any) {
        apiError(res, e.errorMsg)
    }
}
module . exports = {
    loginController,
    registerController
}
export {}