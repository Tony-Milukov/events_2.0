const User = require("./user.model.ts")
const Event = require("./event.model.ts")
const EventMember = require("./eventMember.model.ts")
const UserRating = require("./user.rating.ts")
const Role = require("./role.model.ts")
const JoinEventRequest = require("./joinEventRequest.model.ts")

Event.belongsToMany(User, {through: EventMember})
User.belongsToMany(Event, {through: EventMember})

Event.belongsTo(User)
User.hasMany(Event)

UserRating.belongsTo(User)
User.hasMany(UserRating)

Role.belongsToMany(User, {through: "userRole"})
User.belongsToMany(Role, {through: "userRole"})

User.belongsToMany(Event, {through: JoinEventRequest})
Event.belongsToMany(User, {through: JoinEventRequest})

User.hasMany(JoinEventRequest)
JoinEventRequest.belongsTo(User,{foreignKey: "creatorId"})

module.exports = {
    User,
    Event,
    EventMember,
    UserRating, Role,
    JoinEventRequest
};

export {};