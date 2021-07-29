const mongoose = require("mongoose");

export const userSchema = mongoose.Schema({
    FullName: String,
    username: String,
    email: String,
    password: String,
    bio: String,
    workspaces: Array,
    activities: Array,
    cards: Array,
    createdAt: Date
});