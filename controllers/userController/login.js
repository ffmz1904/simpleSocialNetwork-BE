const bcrypt = require('bcrypt');
const User = require('../../models/User');
const generateJWT = require('../../helpers/generateJWT');
const ApiError = require('../../errors/ApiError');

module.exports = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            next(ApiError.notFound('User not found!'));
        }

        const comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            next(ApiError.badRequest('Bad password!'));
        }

        const token = generateJWT(user.id, user.email);

        res.status(200).json({
            success: true,
            token
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
