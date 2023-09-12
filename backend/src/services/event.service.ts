const {User, Event} = require("../models/main.ts")

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
    const event = (await Event.findOne({
        where: {
            id: eventId
        },
        include: User
    })).dataValues;

    //getting owner data
     const eventOwner = (await User.findByPk(event.userId)).dataValues


    // deleting the personal information from the object, that will be send to user
     delete eventOwner.password

    if (!event) {
        throw {errorMsg: "event with that eventId was not defined", status: 404}
    } else {
        return {...event, eventOwner}
    }
}

const deleteEventByIdService = async (eventId:string) => {
    await Event.destroy({
        where: {
            id: eventId
        }
    })
}
const getAllEventsService = async (limit:number, offset:number) => {
        const events = Event.findAndCountAll({
            limit,
            offset
        })
    if(!events) {
        throw {errorMsg: "something went wrong on getting all events", status: 400}
    } return events
}
module.exports = {
    createEventService,
    getEventByIdService,
    deleteEventByIdService,
    getAllEventsService
}
export {}