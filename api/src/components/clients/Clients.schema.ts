import { Schema, ObjectId, Types } from "mongoose";

// This is how you tell mongoose what your documents look like
// Create a client schema

export const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 100
  },
  user_id: {
    type: Types.ObjectId, 
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 1000,
    ref: "User"
  },
   phoneNumber: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 100
  },
   country: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 100
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 100
  },
},{ timestamps: true },
);
