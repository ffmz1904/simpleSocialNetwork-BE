const ApiError = require('../../errors/ApiError');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

module.exports = async (req, res, next) => {
    const {id} = req.params;

    try {
        const post = await Post.findById(id);
        await Comment.remove({ _id: { $in: post.comments } });
        await post.remove();

        res.status(200).json({
            success: true,
            removedId: post._id
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
