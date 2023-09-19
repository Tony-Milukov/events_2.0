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
    getUserEventsController,
    getUserJoinedEventsController
} = require("../controllers/event.controller.ts")


//create event
router.put("/create", isAuth, createEventController)

//getEvent by eventId
router.get("/getById/:eventId", getEventByIdController)

//delete event by eventId
//* you can delete only your own events
router.post("/delete", isAuth, deleteEventByIdController)

//getAll events, with pagination
router.post("/getAll", getAllEventsController)

//get all user created events
router.post("/getUser", isAuth, getUserEventsController)

//get all members of that event by eventId
router.post("/getMembers", isAuth, getEventMembersController)

// adds user from the token, to the event by eventId
router.put("/addMember", isAuth, addUserToEventController)

// shows all joined events
router.post("/getJoined", isAuth, getUserJoinedEventsController)
module.exports = router
export {}