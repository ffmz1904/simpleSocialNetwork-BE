const bcrypt = require('bcrypt');
const User = require('../../models/User');
const generateJWT = require('../../helpers/generateJWT');
const ApiError = require('../../errors/ApiError');

module.exports = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return next(ApiError.notFound('User not found!'));
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return next(ApiError.badRequest('Bad password!'));
        }

        const token = generateJWT(user.id, user.email);

        res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
