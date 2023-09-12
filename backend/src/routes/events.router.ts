const express = require("express")
const router = express.Router()
const isAuth = require("../middlewares/isAuth.middleware.ts")
const {createEventController,getEventByIdController,deleteEventByIdController,getAllEventsController} = require("../controllers/event.controller.ts")
router.put("/create", isAuth, createEventController)
router.get("/getById/:eventId", getEventByIdController)
router.post("/delete",isAuth, deleteEventByIdController)
router.post("/getAll", getAllEventsController)
module.exports = router
export {}