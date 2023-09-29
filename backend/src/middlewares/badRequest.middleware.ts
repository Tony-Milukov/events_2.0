module.exports = (req:any,res:any) => {
    res.json({
        message: "Bad request",
    }).status(400)
}

export {}