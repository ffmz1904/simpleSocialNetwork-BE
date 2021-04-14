const { FRIENDS_STATUS } = require('../../utils/constants');
const ApiError = require('../../errors/ApiError');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
    const { friendId } = req.body;

    if (!friendId) {
        return next(ApiError.badRequest('Undefined field "friendId"'));
    }

    if (friendId === req.user._id) {
        return next(ApiError.badRequest('Impossible to add yourself as a friend!'));
    }

    try {
        const user = await User.findById(req.user._id);
        const friend = await User.findById(friendId);

        user.friends = user.friends.map(friend => (friend._id === friendId && friend.status === FRIENDS_STATUS.REQUEST)
            ? { ...friend, status: FRIENDS_STATUS.FRIENDS }
            : friend
        );

        friend.friends = friend.friends.map(request => (request._id === String(user._id) && request.status === FRIENDS_STATUS.SUBSCRIBE)
            ? { ...request, status: FRIENDS_STATUS.FRIENDS }
            : request
        );

        await user.save();
        await friend.save();

        res.status(200).json({
            success: true,
            userFriends: user.friends
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
