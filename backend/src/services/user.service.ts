const {User} = require("../models/main.ts")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const v4 = require("uuid").v4
require('dotenv')
    .config({ path: '../.env' });
const loginService = async (email: string, password: string) => {
    //find user by email
    const user = await User.findOne({
        where: {email}
    })
    //if user is not defined and password is wrong
    if (!user || !await bcrypt.compare(password, await user.password)) {
        throw {errorMsg: "Email or password is incorrect", status: 401}
    } return jwt.sign({userId: user.id, username: user.username}, process.env.SECRET)
}
 const registerService = async (email: string, password: string) => {
    //look if there is a user with that email address
    const user = await User.findOne({
        where: {
            email
        }
    })
     if(user) {
         throw {errorMsg: "user with that email address is already registered",status:409}
     }
     await bcrypt.hash(password,9, async (err:any,hash:any) => {
         //if there is an error, return an err message
         if(err) {
             throw {errorMsg: "something went wrong on hashing a password"}
         }
         const user = await User.create({
             email,
             password: hash,
             username: `user_${v4()}`

         })
         //if user is not, he is not created, throw error
         if (!user) {
             throw {errorMsg: "something went wrong on creating a user", status: 400}
         } return user
     })
 }

module.exports = {
    loginService,
    registerService
}
export {}