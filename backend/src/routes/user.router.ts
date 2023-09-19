const express = require("express")
const userRouter = express.Router()
const isAuth = require("../middlewares/isAuth.middleware.ts")

const { loginController, registerController, rateUserController } = require("../controllers/user.controller.ts")
userRouter.post("/login", loginController)
userRouter.put("/register",registerController)
userRouter.put("/rate",isAuth,rateUserController)
// userRouter.get("/getById")


module.exports = userRouter
export {}