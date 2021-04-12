const ApiError = require('../../errors/ApiError');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
           success: true,
            users
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
