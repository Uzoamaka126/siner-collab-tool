import { Schema, Model } from "mongoose";
import { IUserBaseDocument } from "./User.types";

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
      maxlength: 20
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

userSchema.statics.findByName = function (
  this: Model<IUserBaseDocument>,
  fullName: string
  ) {
    return this.findOne({ fullName }).exec()
  }

// userSchema.query.findByEmail = function( email:string ) {
//   let result;
//   return this.where({ email: email }).findOne(function (err:any, data:any) {
//     if (err) console.log(err);
//     if (data) {
//       // doc may be null if no document matched
//       result = data;
//       return result;
//     }
//   });
// };

// userSchema.query.findByEmail = function( email:string ) {
//   let result;
//   return this.findOne({ email: email }, function (err:any, data:any) {
//     if (err) console.log(err);
//     if (data) {
//       // doc may be null if no document matched
//       result = data;
//       return result;
//     }
//   });
// };

