import { Schema, Model } from "mongoose";

export const invoiceSchema: Schema = new Schema({
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
      ref: 'projects'
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
    other_emails: {
      type: [{}],
      required: true
    },
    items: {
      type: [{}],
      required: true
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
    price: {
      type: Number,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 20
    },
    tax: {
      type: Object,
      required: false,
    },
    total_amount: {
      type: Number,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 12
    },
    due_date: {
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
    
},
{ timestamps: true },
);
