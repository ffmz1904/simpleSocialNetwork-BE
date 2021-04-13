const ApiError = require('../../errors/ApiError');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { unsubscribedId } = req.body;

    if (!unsubscribedId) {
        return next(ApiError.badRequest('Parameter "unsubscribedId" is required!'));
    }

    try {
        const user = await User.findById(userId);
        const unsubscribedUser = await User.findById(unsubscribedId);

        user.friends = user.friends.filter(friend => friend._id !== unsubscribedId);
        unsubscribedUser.friends = unsubscribedUser.friends.filter(friend => friend._id !== userId);

        await user.save();
        await unsubscribedUser.save();

        res.status(200).json({
            success: true,
            userFriends: user.friends
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
