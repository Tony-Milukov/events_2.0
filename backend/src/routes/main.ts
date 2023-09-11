const express = require("express")
const router = express.Router()
const userRouter = require ("./user.router.ts")

router.use("/user", userRouter)
router.get("/test", (req:any,res:any) => {
    res.send("hello TEST")
})
module.exports = router
export {}