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
    getJoinedEventsService,
    joinEventRequestService,
    getJoinRequestsService,
    updateEventService
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
        res.json({event}).status(200)
    } catch (e: any) {
        console.log(e)
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

        const requestId = bodyValidator(req, res, "requestId") as number
        const status = bodyValidator(req, res, "status") as boolean

        //getting user info
        const user = req.user
        const userRoles = req.roles

        // await response true for added / false for rejecting
        const response = await addUserToEventService({...user, userRoles}, requestId, status);

        if (!response) {
            return res.json({message: `You successfully reject join request from user ${user.id}`}).status(200)
        }
        res.json({message: `User with the userId: @${user.id} was added as member to the event`}).status(200)

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
const joinEventRequestController = async (req: any, res: any) => {
    try {
        const userId = req.user.dataValues.id
        const eventId = bodyValidator(req, res, "eventId")
        await joinEventRequestService(userId, eventId);
        res.json({message: `You successfully requested adding you to the Event!`}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const getJoinRequestsController = async (req: any, res: any) => {
    try {
        const userId = req.user.dataValues.id

        //if there is no eventId it will output all request for current user,
        //else it will give you the output for the event, by its ID
        const eventId = req.body.eventId as number | undefined | null
        const eventRequests = await getJoinRequestsService(req.roles, userId, eventId);

        res.json({requests: eventRequests}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const updateEventController = async (req: any, res: any) => {
    try {
        const user = req.user
        const title: string | undefined = req.body.title
        const description: string | undefined  = req.body.description
        const price: number | undefined  = req.body.price
        const startLocation: string | undefined  = req.body.startLocation
        const endLocation: string | undefined  = req.body.endLocation
        const links: JSON | undefined = req.body.links

        //if nothing to update
        if (
            title === undefined &&
            price === undefined &&
            startLocation === undefined &&
            endLocation === undefined &&
            links === undefined &&
            description === undefined
        ) {
           return apiError(res,"you have to change minimal one param!!")
        }

        const eventId = bodyValidator(req, res, "eventId") as number
        await updateEventService(eventId, title, price,description, startLocation, endLocation, links);
        res.json({message: `Successfully updated event with evenId: ${eventId}`}).status(200)
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
    getUserJoinedEventsController,
    joinEventRequestController,
    getJoinRequestsController,
    updateEventController
}

export {}