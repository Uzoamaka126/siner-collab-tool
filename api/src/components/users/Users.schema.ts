const mongoose = require("mongoose");

export const userSchema = mongoose.Schema({
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },
    password: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    bio: {
      type: String,
      required: false,
      trim: true,
      maxlength: 1000
    },
    workspaces: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Workspaces',
      required: false
    },
    activities: Array,
    cards: Array,
    createdAt: Date,
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
},
{ timestamps: true },
);

// userSchema.index({ list: 1, name: 1 }, { unique: true })