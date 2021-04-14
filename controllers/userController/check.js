const ApiError = require('../../errors/ApiError');
const generateJWT = require('../../helpers/generateJWT');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return next(ApiError.notFound('User not found!'));
        }

        const token = generateJWT(req.user._id, req.user.email);

        res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
