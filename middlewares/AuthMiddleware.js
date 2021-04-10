const ApiError = require('../errors/ApiError');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return next(ApiError.notAuthorized());
        }

        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (e) {
        return next(ApiError.notAuthorized());
    }
}
