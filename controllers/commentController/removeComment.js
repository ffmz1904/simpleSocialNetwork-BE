const ApiError = require('../../errors/ApiError');
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

module.exports = async (req, res, next) => {
    const {id} = req.params;

    if (!id) {
        return next(ApiError.badRequest('Undefined id param!'));
    }

    try {
        const comment = await Comment.findById(id);
        const post = await Post.findById(comment.postId);

        const index = post.comments.indexOf(id);
        post.comments.splice(index, 1);

        await comment.remove();
        await post.save();

        res.status(200).json({
            success: true,
            removedId: id
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
