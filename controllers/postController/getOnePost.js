const ApiError = require('../../errors/ApiError');
const Post = require('../../models/Post');

module.exports = async (req, res, next) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        res.status(200).json({
            success: true,
            post
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
