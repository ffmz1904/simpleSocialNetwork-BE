const ApiError = require('../../errors/ApiError');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
    const {id} = req.params;

    if (!id) {
        return next(ApiError.badRequest('Undefined id param!'));
    }

    try {
        const user = await User.findById(id);

        let friendsData = [];

        if (user.friends.length) {
            const friendsId = user.friends.map(friend => friend._id);
            friendsData = await User.find({ _id: { $in: friendsId } });
        }

        res.status(200).json({
            success: true,
            friendsData
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
