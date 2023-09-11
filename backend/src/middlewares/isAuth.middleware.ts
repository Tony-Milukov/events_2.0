const jwt = require("jsonwebtoken")

require('dotenv')
    .config({ path: '../.env' });
const isAuthMiddleware = (req:any,res:any, next:any) =>{
    const token = req.token
    if(token && jwt.verify(token, process.env.SECRET)) {
        next()
    } else {
            res.json({message: "you are not logged in!"}).status(401)
    }
}
module.exports = isAuthMiddleware;
export {}