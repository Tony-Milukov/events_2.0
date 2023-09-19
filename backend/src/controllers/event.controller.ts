import {UserInterface} from "../interfaces/user.interface";

const apiError = require("../utilits/apiError.ts")
const {bodyValidator, paramValidator} = require("../utilits/validators/request.validator.ts");
const {
    createEventService,
    getEventByIdService,
    deleteEventByIdService,
    getAllEventsService,
    addUserToEventService,
    getEventMembersService,
    getUserEventsService,
    getJoinedEventsService
} = require("../services/event.service.ts");
const createEventController = async (req: any, res: any) => {
    try {
        const title = bodyValidator(req, res, "title")
        const description = bodyValidator(req, res, "description")
        const price = bodyValidator(req, res, "price")
        const endLocation = bodyValidator(req, res, "endLocation")
        // are allowed to be null
        const links = req.body.links || [] as JSON | null | []
        const startLocation = req.body.startLocation || ""
        console.log({
            title,
            links,
            price,
            endLocation
        })
        const user = req.user
        const event = await createEventService(title, description, price, user, endLocation, startLocation, links);
        res.json({message: "Event was created successfully!", eventId: event.id}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const getEventByIdController = async (req: any, res: any) => {
    try {
        const eventId = paramValidator(req, res, "eventId");
        const event = await getEventByIdService(eventId)
        res.json(event).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const deleteEventByIdController = async (req: any, res: any) => {
    try {
        const eventId = bodyValidator(req, res, "eventId");

        //getting that event
        const event = await getEventByIdService(eventId)

        //proof if the events belongs to the user
        if (event.userId === req.user.id) {
            await deleteEventByIdService(eventId)
            res.status(200).json({message: `Event ${eventId} was successfully deleted`})
        }

        // if there is no permission
        else {
            res.status(403).json({message: "you have no permission to do it"})
        }
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}

const getAllEventsController = async (req: any, res: any) => {
    try {
        const pageSize = bodyValidator(req, res, 'pageSize');
        const page = bodyValidator(req, res, 'page');
        const offset = pageSize * (page === 1 ? 0 : page - 1);
        const events = await getAllEventsService(pageSize, offset);
        res.json(events).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}

const addUserToEventController = async (req: any, res: any) => {
    try {
        const eventId = bodyValidator(req, res, "eventId")

        //getting user
        const user = req.user
        await addUserToEventService(user, eventId)
        res.json({message: `User with the userId: @${user.id} was added as member to the event @${eventId}`}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const getEventMembersController = async (req: any, res: any) => {
    try {
        const eventId = bodyValidator(req, res, "eventId")
        const eventMembers = await getEventMembersService(eventId);
        res.json({eventMembers}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }

}
const getUserEventsController = async (req: any, res: any) => {
    try {
        const user = req.user as UserInterface
        console.log(user.id)
        const events = await getUserEventsService(user);
        res.json(events).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const getUserJoinedEventsController = async (req: any, res: any) => {
    try {
        const user = req.user
        const events = await getJoinedEventsService(user);
        res.json({events}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
module.exports = {
    createEventController,
    deleteEventByIdController,
    getEventByIdController,
    getAllEventsController,
    addUserToEventController,
    getUserEventsController,
    getEventMembersController,
    getUserJoinedEventsController
}

export {}