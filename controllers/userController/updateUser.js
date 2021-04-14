const bcrypt = require('bcrypt');
const User = require('../../models/User');
const ApiError = require('../../errors/ApiError');

module.exports = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { update } = req.body;

    if (!update) {
        return next(ApiError.badRequest('Can\'t update user without update params'));
    }

    try {
        if (update.password) {
            update.password = await bcrypt.hash(update.password, 5);
        }

        await User.findOneAndUpdate({ _id: userId }, update);
        const user = await User.findById(userId);

        res.status(200).json({
            success: true,
            user
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
