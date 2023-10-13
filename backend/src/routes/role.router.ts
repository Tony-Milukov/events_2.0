const express = require("express")
const roleRouter = express.Router()
const isAuth = require("../middlewares/isAuth.middleware.ts")

const { addUserRoleController, createRoleController, deleteRoleController } = require("../controllers/role.controller.ts")


roleRouter.put('/user', isAuth, addUserRoleController)
roleRouter.put('/', isAuth, createRoleController)
roleRouter.post('/', isAuth, deleteRoleController)



module.exports = roleRouter
export {}