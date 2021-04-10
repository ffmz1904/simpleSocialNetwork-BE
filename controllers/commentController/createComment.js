const ApiError = require('../../errors/ApiError');
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

module.exports = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { postId, body } = req.body;

    if (!postId || !body) {
        return next(ApiError.badRequest('Undefined postId or body!'));
    }

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return next(ApiError.notFound(`Post with id = ${postId} not found!`));
        }

        const comment = await Comment.create({ userId, postId, body });
        post.comments.push(comment._id);
        await post.save();

        res.status(200).json({
           success: true,
           comment
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
