const ApiError = require('../../errors/ApiError');
const { Types } = require('mongoose');
const Post = require('../../models/Post');

module.exports = async (req, res, next) => {
    const { id } = req.params;

    try {
        const post = await Post.aggregate([
            { $match: { _id: Types.ObjectId(id) } },
            { $unwind: {
                path: '$comments',
                preserveNullAndEmptyArrays: true
            }},
            { $lookup: {
                from: 'comments',
                localField: 'comments',
                foreignField: '_id',
                as: 'commentData'
            }},
            { $group: {
                "_id": "$_id",
                "title": { "$first": "$title" },
                "body": { "$first": "$body" },
                "userId": { "$first": "$userId" },
                "comments": { "$push": "$commentData" },
                "createdAt": { "$first": "$createdAt" },
                "updatedAt": { "$first": "$updatedAt" },
            }}
        ]);

        res.status(200).json({
            success: true,
            post
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
