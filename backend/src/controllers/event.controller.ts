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
    updateEventService,
    searchEventsByValueService,
    createDriveService,
    deleteDriveService,
    joinDriveService,
    leaveDriveService,
    getDrivesService,
    didUserRequestedJoinService,
    isUserMemberOfEventService
} = require("../services/event.service.ts");
const {verifyUserRoleService, getTokenService, decodeJwtService} = require("../services/user.service.ts")

const createEventController = async (req: any, res: any) => {
    try {
        const title: string = bodyValidator(req, res, "title")
        const description: string = bodyValidator(req, res, "description")
        const price: string = bodyValidator(req, res, "price")
        const endLocation: string = bodyValidator(req, res, "endLocation")
        const files: any = req.files

        // are allowed to be null
        const links = req.body.links || [] as JSON | null | []
        const startLocation = req.body.startLocation || ""
        const user = req.user
        const event = await createEventService(title, description, price, user, endLocation, startLocation, links, files);
        res.json({message: "Event was created successfully!", eventId: event.id}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const getEventByIdController = async (req: any, res: any) => {
    try {
        const eventId: number = paramValidator(req, res, "eventId") as number;
        const event = await getEventByIdService(eventId)

        const token = await getTokenService(req)
        const decodedJwt = await decodeJwtService(token)

        if(decodedJwt) {
            const userMemberOfEvent:boolean = await isUserMemberOfEventService(decodedJwt.userId, eventId)
            const userRequestedJoin:boolean = await didUserRequestedJoinService(decodedJwt.userId, eventId)
            res.json({event: {...event, userMemberOfEvent, userRequestedJoin}}).status(200)
        } else {
            res.json({event}).status(200)
        }


    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const deleteEventByIdController = async (req: any, res: any) => {
    try {
        const eventId: number = bodyValidator(req, res, "eventId");

        //getting that event
        const event = await getEventByIdService(eventId)

        //proof if the events belongs to the user
        if (event.userId === req.user.id || verifyUserRoleService(req.roles, "ADMIN")) {
            await deleteEventByIdService(eventId)
            res.status(200).json({message: `Event ${eventId} was successfully deleted`})
        }
        // if there is no permission
        else {
            res.status(403).json({message: "you have no permission to do it"})
        }
    } catch (e: any) {
        console.log(e)
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
        const userId: number = req.user.dataValues.id

        //if there is no eventId it will output all request for current user,
        //else it will give you the output for the event, by its ID
        const eventId = req.body.eventId as number | undefined | null
        const eventRequests = await getJoinRequestsService(req.roles, userId, eventId);

        res.json({requests: eventRequests}).status(200)
    } catch (e: any) {
        console.log(e)
        apiError(res, e.errorMsg, e.status)
    }
}


const updateEventController = async (req: any, res: any) => {
    try {
        const title: string | undefined = req.body.title
        const description: string | undefined = req.body.description
        const price: number | undefined = req.body.price
        const startLocation: string | undefined = req.body.startLocation
        const endLocation: string | undefined = req.body.endLocation
        const links: JSON | undefined = req.body.links
        const files: any = req.files

        const eventId = bodyValidator(req, res, "eventId") as number
        await updateEventService(eventId, title, price, description, startLocation, endLocation, links, files);
        res.json({message: `Successfully updated event with evenId: ${eventId}`}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}

const searchEventsByValueController = async (req: any, res: any) => {
    try {
        const pageSize = bodyValidator(req, res, 'pageSize');
        const page = bodyValidator(req, res, 'page');
        const offset = pageSize * (page === 1 ? 0 : page - 1);
        const value = paramValidator(req, res, "value")
        const events = await searchEventsByValueService(page, offset, value)
        res.json({events}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}

const createDriveController = async (req: any, res: any) => {
    try {
        const eventId = bodyValidator(req, req, "eventId") as number;
        const allSeats = bodyValidator(req, req, "allSeats") as number;
        const availableSeats = req.body.availableSeats || allSeats - 1;

        const userId = req.user.id
        const description = bodyValidator(req, req, "description") as string;
        const drive = await createDriveService(eventId, userId, description, allSeats, availableSeats)
        res.json({drive}).status(200)
    } catch (e: any) {
        console.log(e)
        apiError(res, e.errorMsg, e.status)
    }
}
const deleteDriveController = async (req: any, res: any) => {
    try {
        const eventId = req.body.eventId as number | undefined;
        const userId = req.user.id as number
        const driveId = req.body.driveId as number | undefined
        await deleteDriveService(eventId, userId, driveId)
        res.json({message: "Successfully deleted a drive possibility for you, you are not offending drive possibilities anymore"}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}

const joinDriveController = async (req: any, res: any) => {
    try {

        const driveId = bodyValidator(req, res, "driveId")
        const user = req.user
        await joinDriveService(driveId, user)
        res.json({message: "You successfully joined the drive!"}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const leaveDriveController = async (req: any, res: any) => {
    try {
        const driveId = bodyValidator(req, res, "driveId")
        const user = req.user
        await leaveDriveService(driveId, user)
        res.json({message: "You successfully left the drive!"}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const getDrivesController = async (req: any, res: any) => {
    try {
        const eventId = bodyValidator(req, res, "eventId")
        const  drives =  await getDrivesService(eventId)
        res.json({drives}).status(200)
    } catch (e: any) {
        console.log(e)
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
    updateEventController,
    searchEventsByValueController,
    createDriveController,
    joinDriveController,
    deleteDriveController,
    leaveDriveController,
    getDrivesController

}

export {}