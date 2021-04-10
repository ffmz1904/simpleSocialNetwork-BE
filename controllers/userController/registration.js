const bcrypt = require('bcrypt');
const User = require('../../models/User');
const ApiError = require('../../errors/ApiError');

module.exports = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next(ApiError.badRequest('Undefined email or password!'));
    }

    try {
        const candidate = await User.findOne({email});

        if (candidate) {
            next(ApiError.badRequest('User already exist!'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, password: hashPassword });

        res.status(200).json({
            success: true,
            user
        });

    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
