const ApiError = require('../../errors/ApiError');
const { Types } = require('mongoose');
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

        const createdComment = await Comment.create({ userId, postId, body });
        post.comments.push(createdComment._id);
        await post.save();

        const comment = await Comment.aggregate([
            { $match: { _id: Types.ObjectId(createdComment._id)}},
            { $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userData'
                }},
            { $unwind: {
                    "path": "$userData",
                    "preserveNullAndEmptyArrays": true
            }},
        ]);

        res.status(200).json({
           success: true,
           comment: comment.shift()
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
