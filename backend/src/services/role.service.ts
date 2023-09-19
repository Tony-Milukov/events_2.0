const {Role,User} = require("../models/main.ts")
const getRoleByIdService = async (roleId:number) => {
    const role = await Role.findByPk(roleId)
    if(!role) {
        throw {errorMsg: "Sorry, but the role with that roleId does not exist", status: 404}
    } return role
}
const createRoleService = async (title:string) => {
    const role = await Role.create({
        title
    })

    if(!role) {
        throw {errorMsg: "Something went wrong on creating a user"}
    } return role
}
const addUserRoleService = async (userId:number, roleId:number) => {
    const role = await getRoleByIdService(roleId)
    const user = await User.findByPk(userId)
    await user.addRole(role)
}

const deleteRoleByIdService = async (roleId:number) => {
    const role = await getRoleByIdService(roleId)
    await role.destroy()
}
module .exports = {
    getRoleByIdService,
    createRoleService,
    addUserRoleService,
    deleteRoleByIdService

}
export {}