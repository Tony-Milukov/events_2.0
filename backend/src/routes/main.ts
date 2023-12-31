const express = require("express")
const router = express.Router()
const userRouter = require ("./user.router.ts")
const eventsRouter = require("./events.router.ts")
const roleRouter = require("./role.router.ts")

router.use("/user", userRouter)
router.use("/event", eventsRouter)
router.use("/role", roleRouter)
module.exports = router
export {}