import {EventInterface} from "../interfaces/event.interface";
import {UserInterface} from "../interfaces/user.interface";
import {RoleInterface} from "../interfaces/role.interface";
import {Op} from "sequelize";

const sharp = require('sharp');
const {User, Event, EventMember, JoinEventRequest, EventDrive, DriveMember} = require("../models/main.ts")
const {getUserByIdService, verifyUserRoleService} = require("./user.service.ts")

const findEventByPk = async (eventId: number) => {
    const event = await Event.findByPk(eventId)
    if (!event) {
        throw {errorMsg: "event with that eventId was not defined", status: 404}
    }
    return event
}

const createEventService = async (title: string, description: string, price: number, user: UserInterface, endLocation: string, startLocation: string | null, links: JSON | null, files: any) => {
    const event = await Event.create({
        title,
        description,
        price,
        endLocation,
        startLocation,
        links,
        userId: user.id
    })
    if (files && files.image && files.image.data) {
        await sharp(files.image.data)
            .webp({quality: 80})
            .toFile(`src/public/events/${event.dataValues.id}.webp`)

        await event.update({
            image: `${event.dataValues.id}.webp`
        })
    }
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
        include: [
            {
                model: User,
                through: EventMember,
                attributes: {exclude: ["roles", "updatedAt", "createdAt", "password", "joinEventRequest"]}
            }
        ]
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
    const event = await findEventByPk(joinEventRequest.dataValues.eventId)

    // const getting event by its id in joinRequest obj
    // requested user to add to an event
    const newMemberUser = await User.findByPk(joinEventRequest.dataValues.userId)


    //check if the user from JWT is the creator from the event
    //or is the user from JWT an ADMIN

    if (event.dataValues.creatorId !== user.id && !verifyUserRoleService(user.roles, "ADMIN")) {
        throw {errorMsg: "you dont have permission to do it!", status: 403}
    }

    await event.addUser(newMemberUser)
    return true
}
const getEventMembersService = async (eventId: any) => {
    const event = await findEventByPk(eventId)

    return await event.getUsers()
}
const getUserEventsService = async (user: UserInterface) => {
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
    const event = await findEventByPk(eventId)

    await JoinEventRequest.create({
        userId: userId,
        eventId,
        creatorId: event.dataValues.userId
    })
    return
}

const getJoinRequestsService = async (roles: RoleInterface[], userId: number, eventId?: number | undefined | null) => {
    //check if admin, then don't proof if user is event creator
    if (verifyUserRoleService(roles, "ADMIN") && eventId) {
        return await JoinEventRequest.findAll({
            where: {
                eventId
            },
            include: [{model: Event, attributes: {exclude: ["description"]}}, {
                model: User,
                attributes: {exclude: ["password"]}
            }]

        })
    } else {
        return await JoinEventRequest.findAll({
            where: {
                creatorId: userId,
                ...(eventId ? {eventId} : {})
            },
            include: [Event, User]
        })

    }
}
const updateEventService = async (eventId: number, title: string | undefined, price: number | undefined, description: string | undefined, startLocation: string | undefined, endLocation: string | undefined, links: JSON, files: any) => {
    //if nothing to update
    if (
        title === undefined &&
        price === undefined &&
        startLocation === undefined &&
        endLocation === undefined &&
        links === undefined &&
        description === undefined &&
        files.image === undefined
    ) {
        throw {message: "you have to change minimal one param!!"}
    }

    const event = await findEventByPk(eventId)
    if (files && files.image && files.image.data) {
        await sharp(files.image.data)
            .webp({quality: 80})
            .toFile(`src/public/events/${event.dataValues.id}.webp`)

        await event.update({
            image: `${event.dataValues.id}.webp`
        })
    }
    await event.update({
        ...(title ? {title} : {}),
        ...(price ? {price} : {}),
        ...(description ? {description} : {}),
        ...(startLocation ? {startLocation} : {}),
        ...(endLocation ? {endLocation} : {}),
        ...(links ? {links} : {}),
        ...(files && files.image ? {image: `${event.dataValues.id}.webp`} : {}),
    })
}
const searchEventsByValueService = async (limit: number, offset: number, value: string) => {
    return await Event.findAndCountAll({
        limit,
        offset,
        where: {
            title: {
                [Op.iLike]: `%${value}%`
            }
        }
    })
}
const isUserMemberOfEvent = async (eventId: number, userId: number) => {
    const isUserMemberOfEvent = await EventMember.findOne({
        where: {
            eventId,
            userId
        }
    })
    if (!isUserMemberOfEvent) {
        throw {errorMsg: "Driver with that userId is not a member of that event!", status: 404}
    }

}
const createDriveService = async (eventId: number, userId: number, description: string, allSeats: number, availableSeats: number) => {
    await getEventByIdService(eventId)
    await isUserMemberOfEvent(eventId, userId)
    const doDriverExist = await EventDrive.findOne({
        where: {
            driverId: userId,
            eventId
        }
    })
    if (doDriverExist) {
        throw {errorMsg: "Driver with that userId already exists in that event!", status: 404}
    }
    return await EventDrive.create({
        eventId,
        driverId: userId,
        description,
        allSeats,
        availableSeats
    })

}
const getDriveByIdService = async (driveId: number) => {
    const eventDrive = await EventDrive.findByPk(driveId)

    if (!eventDrive) {
        throw {errorMsg: "Event Drive with that eventId was undefined", status: 404}
    } else {
        return eventDrive
    }
}

const getDriveEventAndUser = async (eventId: number, userId: number) => {
    const eventDrive = await EventDrive.findOne({
        where: {
            driverId: userId,
            eventId
        }
    })

    if (!eventDrive) {
        throw {errorMsg: "Event Drive with that eventId and UserId was undefined", status: 404}
    } else {
        return eventDrive
    }
}

const deleteDriveService = async (eventId: number | undefined, userId: number | undefined, driveId: number) => {

    // if event Id and userId was give, destroy the drive by it
    if (eventId && userId) {
        await getDriveEventAndUser(eventId, userId)
        await EventDrive.destroy({
            where: {
                eventId,
                driverId: userId,
            }
        })
    } else if (driveId) {
        await getDriveByIdService(driveId)
        await EventDrive.destroy({
            where: {
                id: driveId
            }
        })
    } else {
        throw {errorMsg: "You have to send eventId or driveId!"}
    }
}

const joinDriveService = async (driveId: number | undefined, user: UserInterface): Promise<any> => {
    if (driveId) {
        const eventDrive = await getDriveByIdService(driveId)
        const eventMember = await DriveMember.findOne({
            where: {
                eventId: eventDrive.eventId,
                userId: user.id
            }
        })
        if (eventMember) {
            throw {errorMsg: `You already joined the drive with id: ${driveId}`}
        } else {
            const driveMember = await eventDrive.addUser(user)
            await driveMember[0].update({
                eventId: eventDrive.eventId
            })

            await eventDrive.update({
                availableSeats: eventDrive.availableSeats - 1
            })
            return driveMember
        }
    }
}

const leaveDriveService = async (driveId: number | undefined, user: UserInterface): Promise<void> => {
    if (driveId) {
        const eventDrive = await getDriveByIdService(driveId)
        const eventMember = await DriveMember.findOne({
            where: {
                eventId: eventDrive.eventId,
                userId: user.id
            }
        })
        if (eventMember) {
            await eventDrive.removeUser(user)
            await eventDrive.update({
                availableSeats: eventDrive.availableSeats + 1
            })
        } else {
            throw {errorMsg: `You have not joined the drive with id: ${driveId}`}
        }
    }
}
const getDrivesService = async (eventId: number, user: UserInterface) => {
    await getEventByIdService(eventId)
    const drives =  await EventDrive.findAll({
        where: {
            eventId
        },
        include: [{model: User, attributes: {exclude: ["password", "updatedAt"]}, as: "driver"}]
    })
    const joinedDrive = await DriveMember.findOne({
        where: {
            eventId,
            userId: user.id
        }
    })

    return {
        joinedDrive,
        drives
    }
}

const isUserMemberOfEventService = async (userId: number, eventId: number): Promise<boolean> => {
    const events = await EventMember.findAll({
        where: {
            userId,
            eventId
        }
    })
    return events.length > 0
}
const didUserRequestedJoinService = async (userId: number, eventId: number): Promise<boolean> => {
    const joinRequests = await JoinEventRequest.findAll({
        where: {
            userId,
            eventId
        }
    })

    return joinRequests.length > 0
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
}
export {}




