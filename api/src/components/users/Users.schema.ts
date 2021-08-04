import { Schema } from "mongoose";

const mongoose = require("mongoose");

export const userSchema: Schema = new Schema({
    fullName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 1000
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxlength: 20
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 100,
      unique: true
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
    activities: [{}],
    cards: [{}],
    createdAt: Date,
    // createdBy: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
},
{ timestamps: true },
);

// userSchema.index({ workspaces: 1, title: 1 }, { unique: true })