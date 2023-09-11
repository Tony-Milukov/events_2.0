const express = require("express")
const router = express.Router()
const userRouter = require ("./user.router.ts")
const eventsRouter = require("./events.router.ts")
router.use("/user", userRouter)
router.use("/events", eventsRouter)

module.exports = router
export {}