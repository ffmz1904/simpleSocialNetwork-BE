const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    comments: { type: [Schema.Types.ObjectId], default: [] },

    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
}, { versionKey: false });

module.exports = model('Post', postSchema);
