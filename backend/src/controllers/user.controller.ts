const apiError = require("../utilits/apiError.ts")
const {bodyValidator} = require("../utilits/validators/request.validator.ts")
const {loginService, registerService} = require("../services/user.service.ts")

const loginController = async (req: any, res: any) => {
    try {
        console.log(req.body)
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
module.exports = {
    loginController,
    registerController
}
export {}