const HttpError = require("../models/http-error")
const jwt = require("jsonwebtoken")
function checkAuth(req, res, next) {
    if(req.method === "OPTIONS") {
        return next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        if(!token) {throw new Error("Token invalid !")}
        const decodeToken = jwt.verify(token, "secret_key_he_he_ho_ho")
        req.userData = {userId: decodeToken.userId, expire: decodeToken.expire}
        next()
    } catch (error) {
        return next(new HttpError("Fail to Authorization", 401))
    }
}

module.exports = checkAuth