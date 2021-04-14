const ApiError = require('../../errors/ApiError');
const { Types } = require('mongoose');
const Post = require('../../models/Post');

module.exports = async (req, res, next) => {
    const {id} = req.query;
    const aggregationQuery = [];

    if (id) {
        aggregationQuery.unshift({ $match: { userId: Types.ObjectId(id) } });
    }

    aggregationQuery.push({ $sort: {createdAt: -1} });

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
