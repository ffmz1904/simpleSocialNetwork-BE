const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, required: true },
    body: { type: String, required: true },

    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
}, { versionKey: false });

module.exports = model('Comment', commentSchema);
