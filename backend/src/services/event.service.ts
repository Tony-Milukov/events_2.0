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
        throw {}
    }
    return event
}
const getEventByIdService = async (eventId: string) => {
    const event = await Event.findByPk(eventId);
    if (!event) {
        throw {errorMsg: "event with that eventId was not defined", status: 404}
    } else {
        return event
    }
}

const deleteEventByIdService = async (eventId:string) => {
    await Event.destroy({
        where: {
            id: eventId
        }
    })
}
module.exports = {
    createEventService,
    getEventByIdService,
    deleteEventByIdService
}
export {}