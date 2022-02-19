import { Schema, ObjectId, Types } from "mongoose";

// This is how you tell mongoose what your documents look like
// Create a client schema

export const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 100
  },
  user_id: {
    type: String,
    required: false,
    trim: true,
    minLength: 2,
    maxlength: 100,
    ref: 'User'
  },
},{ timestamps: true },
);
