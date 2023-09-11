const express = require("express")
const router = express.Router()
const isAuth = require("../middlewares/isAuth.middleware.ts")
const {createEventController} = require("../controllers/event.controller.ts")
router.put("/create", isAuth, createEventController)
module.exports = router
export {}