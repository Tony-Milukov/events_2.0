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
    getUserJoinedEventsController,
    joinEventRequestController,
    getJoinRequestsController,
    updateEventController,
    searchEventsByValueController,
    createDriveController,
    joinDriveController,
    deleteDriveController,
    leaveDriveController,
    getDrivesController

} = require("../controllers/event.controller.ts")


//create event
router.put("/create", isAuth, createEventController)

//update event
router.put("/update", isAuth, updateEventController)

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
router.put("/acceptJoinRequest", isAuth, addUserToEventController)

// users wants to join an event
// user send a request to eventCreator for join event
router.put("/joinRequest", isAuth, joinEventRequestController)

//gets all requests for an event by id
router.post("/getJoinRequests", isAuth, getJoinRequestsController)

// shows all joined events
router.post("/getJoined", isAuth, getUserJoinedEventsController)

// gets all events by :value
router.post("/search/:value", searchEventsByValueController)

// add New drive
router.put("/drive", isAuth, createDriveController)

// delete driver
router.post("/drive/delete", isAuth, deleteDriveController)

// join a drive
router.put("/drive/join", isAuth, joinDriveController)

// leave a drive
router.post("/drive/leave", isAuth, leaveDriveController)

router.post("/drive", isAuth, getDrivesController)


module.exports = router
export {}
