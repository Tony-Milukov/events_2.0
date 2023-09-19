const sequelize = require("../db.ts")
const {User, Event, EventMember, UserRating} = require("../models/main.ts")

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
const getEventByIdService = async (eventId: string) => {
    let event = await Event.findOne({
        where: {
            id: eventId
        },
        include: [User, {model: User, through:  EventMember}]
    })
    if (!event) {
        throw {errorMsg: "event with that eventId was not defined", status: 404}
    } else {
        event = event.dataValues
        //getting owner data
        const eventOwner = (await User.findByPk(event.userId)).dataValues

        // deleting the personal information from the object, that will be send to user
        delete eventOwner.password
        return {...event, eventOwner}
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
        offset,
        include: {
            // get user and his rating
            User, attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
                [sequelize.fn('COUNT', sequelize.col('*')), 'count']]
        }
    })
    if (!events) {
        throw {errorMsg: "something went wrong on getting all events", status: 400}
    }
    return events
}
const addUserToEventService = async (user: any, eventId: any) => {
    const event = await Event.findByPk(eventId)
    if (!event) {
        throw {errorMsg: "event with that eventId was not defined", status: 404}
    }
    await event.addUser(user)
    return
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
module.exports = {
    createEventService,
    getEventByIdService,
    deleteEventByIdService,
    getAllEventsService,
    addUserToEventService,
    getEventMembersService,
    getUserEventsService,
    getJoinedEventsService
}
export {}




