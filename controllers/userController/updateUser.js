const bcrypt = require('bcrypt');
const User = require('../../models/User');
const ApiError = require('../../errors/ApiError');
const path = require('path');
const uuid = require('uuid');

module.exports = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { update } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + '.jpeg';

    if (img) {
        await img.mv(path.resolve(__dirname, '..', '..', 'static', 'user_images', fileName));
    }

    if (!update) {
        return next(ApiError.badRequest('Can\'t update user without update params'));
    }

    try {
        if (update.password) {
            const oldPassword = await User.findOne({ _id: userId }, { password: 1, _id: 0});
            const comparePassword = await bcrypt.compare(update.oldPassword, oldPassword.password);

            if (!comparePassword) {
                return next(ApiError.badRequest('Bad old password!'));
            }
            delete update.oldPassword;
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
