const bodyValidator = (req: any, res: any, name: string) => {
    const paramValue = req.body[name];
    if (paramValue === 0 ? false : !paramValue || paramValue === 'undefined') {
        throw {errorMsg: `data <<${name}>> was not sent in body request`}
    }
    return paramValue;
}
const paramValidator = (req: any, res: any, name: string) => {
    const paramValue = req.params[name];
    if (!paramValue) {
        throw {errorMsg: `data <<${name}>> was not sent in params request`}
    }
    return paramValue;
}

module.exports = {
    paramValidator,
    bodyValidator
}