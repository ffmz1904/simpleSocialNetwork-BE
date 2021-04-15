const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    friends: { type: Array, default: [] },
    img: { type: String, default: process.env.DEFAULT_USER_IMG }
}, { versionKey: false });

module.exports = model('User', userSchema);
