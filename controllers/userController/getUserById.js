const ApiError = require('../../errors/ApiError');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return next (ApiError.notFound('User not found!'));
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
