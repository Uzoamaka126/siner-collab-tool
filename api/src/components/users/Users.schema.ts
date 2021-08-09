import { Schema, Model } from "mongoose";
import { IBaseUser, IUserBaseDocument } from "./User.types";
const bcrypt = require("bcryptjs");

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

// userSchema.methods.findByName = function (
//   this: Model<IUserBaseDocument>,
//   fullName: string
//   ) {
//     return this.findOne({ fullName }).exec()
// }

userSchema.methods.checkPassword = function(this:any, password: string) {
  const passwordHash = this.password;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err:any, same:any) => {
      if (err) {
        return reject(err)
      }
      resolve(same)
    })
  })
}
