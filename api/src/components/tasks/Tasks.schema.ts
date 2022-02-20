import { Schema, Types } from "mongoose";

// This is how you tell mongoose what your documents look like
// Create a tasks schema

export const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 100
  },
  project_id: {
    type: Types.ObjectId,
    required: true,
    trim: true,
    minLength: 24,
    maxlength: 100,
    ref: 'Project'
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
},{ timestamps: true },
);
