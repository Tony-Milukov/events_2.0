const express = require("express")
const userRouter = express.Router()
const isAuth = require("../middlewares/isAuth.middleware.ts")

const { loginController, registerController, rateUserController, getUserRatingController, getUserByIdController } = require("../controllers/user.controller.ts")
userRouter.post("/login", loginController)
userRouter.put("/register",registerController)
userRouter.put("/rating",isAuth,rateUserController)
userRouter.get("/rating/:userId",getUserRatingController)
userRouter.get("/getById/:userId",getUserByIdController)


module.exports = userRouter
export {}