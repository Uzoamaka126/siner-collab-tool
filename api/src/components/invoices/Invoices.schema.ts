import { Schema, Model } from "mongoose";

export const invoiceSchema: Schema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 1000
    },
    client_email: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 100
    },
    user_id: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 100,
      ref: 'User'
    },
    project_id: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 100,
      ref: 'Project'
    },
    currency: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 5
    },
    memo: {
      type: String,
      trim: true,
      minLength: 2,
      maxlength: 300,
      required: false,
    },
    meta: {
      type: Object,
      required: false,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 20
    },
    invoice_no: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 12
    },
    due_date: {
      type: Date,
      required: false,
    },
    date_paid: {
      type: Date,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 12
    },
    client: {
      type: Object,
      required: true
    }
    
},
{ timestamps: true },
);
