const User = require("./user.model.ts")
const Event = require("./event.model.ts")
const EventMember = require("./eventMember.model")
const UserRating = require("./user.rating.ts")
const Role = require("./role.model.ts")


Event.belongsToMany(User, {through: EventMember})
User.belongsToMany(Event, {through: EventMember})

Event.belongsTo(User)
User.hasMany(Event)

UserRating.belongsTo(User)
User.hasMany(UserRating)

Role.belongsToMany(User, {through: "userRole"})
User.belongsToMany(Role, {through: "userRole"})


module.exports = {
    User,
    Event,
    EventMember,
    UserRating, Role
};

export {};