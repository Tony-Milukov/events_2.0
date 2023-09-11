const apiError = (res:any, message = 'Internal Server Error', status = 500) => {
    res.status(status).json({ message });
};
module.exports = apiError;
export {};