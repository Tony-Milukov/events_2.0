const User = require("./user.model.ts")
const Event = require("./event.model.ts")
const EventMember = require("./eventMember.model")
Event.belongsToMany(User, {through: EventMember})

Event.belongsTo(User)
User.hasMany(Event)

module.exports = {
    User,
    Event,
    EventMember
};

export {};