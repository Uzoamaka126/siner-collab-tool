import { Schema, ObjectId, Types } from "mongoose";
import { tagSchema } from '../tags/Tags.schema'
import { invoiceSchema } from '../invoices/Invoices.schema'

// This is how you tell mongoose what your documents look like
// Create a client schema

export const projectSchema = new Schema({
  title: {
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
  status: {
    type: String, 
    required: true,
  },
  deadline: {
    type: Date, 
    required: false,
  },
  client_id: {
    type: Types.ObjectId, 
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 1000,
    ref: "Client"
  },
  tasks: {
    type: [Types.ObjectId], 
    required: false,
    ref: "Task"
  },
  tags: {
    type: [Types.ObjectId], 
    required: false,
    ref: "Tag"
  },
  invoices: {
    type: [Types.ObjectId], 
    required: false,
    ref: "Invoice"
  }
},{ timestamps: true },
);
