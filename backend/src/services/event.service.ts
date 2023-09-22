import {EventInterface} from "../interfaces/event.interface";
import {UserInterface} from "../interfaces/user.interface";
import {RoleInterface} from "../interfaces/role.interface";

const {User, Event, EventMember, JoinEventRequest} = require("../models/main.ts")
const {getUserByIdService, verifyUserRoleService} = require("./user.service.ts")

const createEventService = async (title: string, description: string, price: number, user: any, endLocation: string, startLocation: string | null, links: JSON | null) => {
    const event = await Event.create({
        title,
        description,
        price,
        endLocation,
        startLocation,
        links,
        userId: user.id
    })
    if (!event) {
        throw {errorMsg: "something went wrong on creating an event", status: 400}
    }
    return event
}
const getEventByIdService = async (eventId: number | string) => {
    let event = await Event.findOne({
        where: {
            id: eventId
        },
        //getting data about eventMembers
        include: [{model: User, through: EventMember}]
    })

    if (!event) {
        throw {errorMsg: "event with that eventId was not defined", status: 404}
    } else {
        event = event.dataValues as EventInterface

        //getting owner data
        const eventCreator = await getUserByIdService(event.userId)
        return {...event, eventCreator}
    }

}

const deleteEventByIdService = async (eventId: string) => {
    await Event.destroy({
        where: {
            id: eventId
        }
    })

}
const getAllEventsService = async (limit: number, offset: number) => {
    const events = Event.findAndCountAll({
        limit,
        offset
    })
    if (!events) {
        throw {errorMsg: "something went wrong on getting all events", status: 400}
    }
    return events
}
const getAddMemberRequestService = async (joinRequestId: number) => {
    const joinRequest = await JoinEventRequest.findByPk(joinRequestId)
    if (!joinRequest) {
        throw {errorMsg: "JoinRequest with that eventId was not defined", status: 404}
    }
    return joinRequest
}

const addUserToEventService = async (user: UserInterface, joinRequestId: number, requestStatus: boolean) => {

    //getting the join request
    const joinEventRequest = await getAddMemberRequestService(joinRequestId)
    const status = joinEventRequest.dataValues.status

    if (status !== null) {
        throw {errorMsg: `you already ${status ? "approved" : "rejected"} user request`}
    }

    await joinEventRequest.update({
        status: requestStatus
    })

    if (requestStatus === false) {
        return false
    }

    // const getting event by its id in joinRequest obj
    const event = await Event.findByPk(joinEventRequest.dataValues.eventId)

    // const getting event by its id in joinRequest obj
    // requested user to add to an event
    const newMemberUser = await User.findByPk(joinEventRequest.dataValues.userId)

    if (!event) {
        throw {errorMsg: "event with that eventId was not defined", status: 404}
    }

    //check if the user from JWT is the creator from the event
    //or is the user from JWT an ADMIN

    if (event.dataValues.creatorId !== user.id && !verifyUserRoleService(user.roles, "ADMIN")) {
        throw {errorMsg: "you dont have permission to do it!", status: 403}
    }

    await event.addUser(newMemberUser)
    return true
}
const getEventMembersService = async (eventId: any) => {
    const event = await Event.findByPk(eventId)
    if (!event) {
        throw {errorMsg: "event with that eventId was not defined", status: 404}
    }

    return await event.getUsers()
}
const getUserEventsService = async (user: any) => {
    return await Event.findAndCountAll({
        where: {
            userId: user.id
        }
    })
}
const getJoinedEventsService = async (user: any) => {
    const events = await user.getEvents()
    return events ?? []
}
const joinEventRequestService = async (userId: number, eventId: number) => {
    const event = await Event.findByPk(eventId)

    if (!event) throw {errorMsg: "event with that eventId was not defined", status: 404}

    await JoinEventRequest.create({
        userId: userId,
        eventId,
        creatorId: event.dataValues.userId
    })
    return
}

const getJoinRequestsService = async (roles: RoleInterface[],userId: number,  eventId?: number | undefined | null) => {
    //check if admin, then don't proof if user is event creator
    if (verifyUserRoleService(roles, "ADMIN") && eventId) {
        return await JoinEventRequest.findAll({
            where: {
                eventId
            }
        })
    }
    else {
        return await JoinEventRequest.findAll({
            where: {
                creatorId: userId,
                ...(eventId ? {eventId} : {})
            }
        })
    }
}

module.exports = {
    createEventService,
    getEventByIdService,
    deleteEventByIdService,
    getAllEventsService,
    addUserToEventService,
    getEventMembersService,
    getUserEventsService,
    getJoinedEventsService,
    joinEventRequestService,
    getJoinRequestsService
}
export {}




