const express = require("express")
const router = express.Router()
const isAuth = require("../middlewares/isAuth.middleware.ts")
const {
    createEventController,
    getEventByIdController,
    deleteEventByIdController,
    getAllEventsController,
    addUserToEventController,
    getEventMembersController,
    getUserEventsController
} = require("../controllers/event.controller.ts")

router.put("/create", isAuth, createEventController)
router.get("/getById/:eventId", getEventByIdController)
router.post("/delete", isAuth, deleteEventByIdController)
router.post("/getAll", getAllEventsController)
router.post("/getAll", getAllEventsController)
router.post("/getUserEvents", isAuth, getUserEventsController)
router.post("/getEventMembers", isAuth, getEventMembersController)
module.exports = router
export {}