const { FRIENDS_STATUS } = require('../../utils/constants');
const ApiError = require('../../errors/ApiError');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
    const { subscribeTo } = req.body;

    if (!subscribeTo) {
        return next(ApiError.badRequest('Undefined "subscribeTo" field!'));
    }

    if (subscribeTo === req.user._id) {
        return next(ApiError.badRequest('Impossible to add yourself as a friend!'));
    }

    try {
        const user = await User.findById(req.user._id);
        const userSubscribingTo = await User.findById(subscribeTo);

        user.friends.push({
            _id: subscribeTo,
            status: FRIENDS_STATUS.SUBSCRIBE
        });

        userSubscribingTo.friends.push({
            _id: String(user._id),
            status: FRIENDS_STATUS.REQUEST
        });

        await user.save();
        await userSubscribingTo.save();

        res.status(200).json({
            success: true,
            userFriends: user.friends
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
