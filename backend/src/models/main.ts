const User = require("./user.model.ts")
const Event = require("./event.model.ts")

Event.belongsToMany(User, {through: "eventMembers"})
User.belongsToMany(Event,{through: "userEvents"})


module.exports = {
    User,
    Event
};

export {};