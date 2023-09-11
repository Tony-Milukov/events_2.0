const apiError = require("../utilits/apiError.ts")
const {bodyValidator}  = require("../utilits/validators/request.validator.ts")
const createEventController = async (req:any,res:any) => {
    try {

    } catch (e) {
        apiError(e)
    }
}
module.exports = {
    createEventController
}
export {}