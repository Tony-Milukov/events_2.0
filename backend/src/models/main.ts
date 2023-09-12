const User = require("./user.model.ts")
const Event = require("./event.model.ts")

Event.belongsToMany(User, {through: "eventMembers"})

Event.belongsTo(User)
User.hasMany(Event)

module.exports = {
    User,
    Event
};


export {};