const express = require("express")
const userRouter = express.Router()
const { loginController, registerController } = require("../controllers/user.controller.ts")
userRouter.post("/login", loginController)
userRouter.put("/register",registerController)
userRouter.get("/logout")
userRouter.get("/getById")


module.exports = userRouter
export {}