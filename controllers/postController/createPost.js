const ApiError = require('../../errors/ApiError');
const Post = require('../../models/Post');

module.exports = async (req, res, next) => {
    const { title, body } = req.body;
    const { _id: userId } = req.user;

    if (!title || !body) {
        return next(ApiError.badRequest('Undefined post title or body!'));
    }

    try {
        const post = await Post.create({ userId, title, body });

        res.status(200).json({
           success: true,
           post
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
