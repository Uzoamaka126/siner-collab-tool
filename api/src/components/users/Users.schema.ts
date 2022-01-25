import { Schema, Model } from "mongoose";

const mongoose = require("mongoose");

export const userSchema = new Schema({
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
      maxlength: 1000,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxlength: 100
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 100,
      unique: true,
    },
    is_verified: { 
      type: Boolean, 
      default: false 
    },
    clients: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Clients',
      required: false
    },
    projects: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Projects',
      required: false
    },
    invoices: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Invoices',
      required: false
    },
    tags: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Tags',
      required: false
    },
    createdAt: Date,
},
{ timestamps: true },
);

// userSchema.index({ workspaces: 1, title: 1 }, { unique: true })

// userSchema.methods.findByName = function (
//   this: Model<IUserBaseDocument>,
//   fullName: string
//   ) {
//     return this.findOne({ fullName }).exec()
// }
