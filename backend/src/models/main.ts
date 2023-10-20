const User = require("./user.model.ts")
const Event = require("./event.model.ts")
const EventMember = require("./eventMember.model.ts")
const UserRating = require("./user.rating.ts")
const Role = require("./role.model.ts")
const JoinEventRequest = require("./joinEventRequest.model.ts")
const EventDrive = require("./event.drive.model.ts")
const DriveMember = require("./driveMember.model.ts")
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
JoinEventRequest.belongsTo(User,{foreignKey: "userId"})

Event.hasMany(JoinEventRequest)
JoinEventRequest.belongsTo(Event,{foreignKey: "eventId"})


EventDrive.belongsTo(Event)
Event.hasMany(EventDrive)

User.belongsToMany(EventDrive, {through: DriveMember})
EventDrive.belongsToMany(User, {through: DriveMember})

Event.hasMany(DriveMember)
DriveMember.belongsTo(Event)


module.exports = {
    User,
    Event,
    EventMember,
    UserRating,
    Role,
    JoinEventRequest,
    EventDrive,
    DriveMember
};

export {};