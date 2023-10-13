const express = require("express")
const userRouter = express.Router()
const isAuth = require("../middlewares/isAuth.middleware.ts")

const {
    loginController,
    registerController,
    rateUserController,
    getUserRatingController,
    getUserByIdController,
    updateUserDataController,
    updateUserProfilePicController
} = require("../controllers/user.controller.ts")

//auth
userRouter.post("/login", loginController)
userRouter.put("/register", registerController)

//only auth users
userRouter.put("/rating", isAuth, rateUserController)
userRouter.put("/update", isAuth, updateUserDataController)
userRouter.put("/pic", isAuth, updateUserProfilePicController)

//guests too
userRouter.get("/rating/:userId", getUserRatingController)
userRouter.get("/getById/:userId", getUserByIdController)
module.exports = userRouter
export {}