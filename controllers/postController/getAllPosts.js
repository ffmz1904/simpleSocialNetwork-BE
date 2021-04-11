const ApiError = require('../../errors/ApiError');
const { Types } = require('mongoose');
const Post = require('../../models/Post');

module.exports = async (req, res, next) => {
    const {id} = req.query;
    const aggregationQuery = [];

    if (id) {
        aggregationQuery.unshift({ $match: { userId: Types.ObjectId(id) } });
    }

    aggregationQuery.push({ $unwind: {
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
            }},
        { $sort: {createdAt: -1} });

    try {
        const posts = await Post.aggregate(aggregationQuery);

        res.status(200).json({
            success: true,
            posts
        });
    } catch (e) {
        next(ApiError.internal(e.message));
    }
};
