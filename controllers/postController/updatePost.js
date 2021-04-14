const ApiError = require('../../errors/ApiError');
const Post = require('../../models/Post');

module.exports = async (req, res, next) => {
    const {id: postId} = req.params;
    const { _id: userId } = req.user;
    const { update } = req.body;

    try {
        await Post.findOneAndUpdate({ _id: postId, userId }, update);
        const post = await Post.findById(postId);

        res.status(200).json({
            success: true,
            post
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
