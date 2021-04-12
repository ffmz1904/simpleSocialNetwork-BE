const ApiError = require('../../errors/ApiError');
const { Types } = require('mongoose');
const Comment = require('../../models/Comment');

module.exports = async (req, res, next) => {
    const { post } = req.query;
    const aggregationQuery = [];

    if (post) {
        aggregationQuery.push({ $match: { postId: Types.ObjectId(post) }});
    }

    aggregationQuery.push(
        { $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userData'
        }},
        {"$unwind": {
            "path": "$userData",
            "preserveNullAndEmptyArrays": true
        }}
    );

    try {
        const comments = await Comment.aggregate(aggregationQuery);

        res.status(200).json({
           success: true,
           comments
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
