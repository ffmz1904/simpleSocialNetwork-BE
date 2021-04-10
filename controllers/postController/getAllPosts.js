const ApiError = require('../../errors/ApiError');
const Post = require('../../models/Post');

module.exports = async (req, res, next) => {
    try {
        const posts = await Post.find();

        res.status(200).json({
            success: true,
            posts
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
