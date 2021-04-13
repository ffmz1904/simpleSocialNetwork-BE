const ApiError = require('../../errors/ApiError');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
    const { name } = req.query;
    let users;

    try {
        if (name) {
            const nameFilter = new RegExp(name, 'i');
            users = await User.find({name: nameFilter});
        } else {
            users = await User.find();
        }

        res.status(200).json({
           success: true,
            users
        });
    } catch (e) {
        console.log('Error ', e.message);
        next(ApiError.internal(e.message));
    }
};
