const User = require("./user.model.ts")
const Event = require("./event.model.ts")
const EventMember = require("./eventMember.model")
const UserRating = require("./user.rating.ts")

UserRating.belongsTo(User)
User.hasMany(UserRating)

Event.belongsToMany(User, {through: EventMember})
User.belongsToMany(Event, {through: EventMember})

Event.belongsTo(User)
User.hasMany(Event)


module.exports = {
    User,
    Event,
    EventMember,
    UserRating
};

export {};