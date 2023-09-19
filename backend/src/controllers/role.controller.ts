const apiError = require("../utilits/apiError.ts")
const {bodyValidator} = require("../utilits/validators/request.validator.ts")
const {addUserRoleService, createRoleService,deleteRoleByIdService} = require("../services/role.service.ts")

const createRoleController = async (req: any, res: any) => {
    try {
        const title = bodyValidator(req, res, "title")
        const role = await createRoleService(title)
        res.json({message: `Successfully created role with title: ${title}`, roleId: role.id}).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}
const addUserRoleController = async (req: any, res: any) => {
    try {
        const userId = bodyValidator(req, res, "userId")
        const roleId = bodyValidator(req, res, "roleId")

        await addUserRoleService(userId,roleId)

        res.json(`Successfully added role ${roleId} to user ${userId}`).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}

const deleteRoleController = async  (req: any, res: any) => {
    try {
        const roleId = bodyValidator(req,res,"roleId")
        await deleteRoleByIdService(roleId)

        res.json(`Successfully deleted the role ${roleId}`).status(200)
    } catch (e: any) {
        apiError(res, e.errorMsg, e.status)
    }
}



module.exports = {
    addUserRoleController,
    createRoleController,
    deleteRoleController
}
export {}