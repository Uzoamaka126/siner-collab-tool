import { Schema, Model } from "mongoose";

export const workspaceSchema: Schema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 100
    },
    type: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 100
    },
    description: {
      type: String,
      trim: true,
      minLength: 2,
      maxlength: 100,
      required: false,
    },
    members: {
      type: [{}],
      ref: 'Users',
      required: true
    },
    boards: {
      type: [{}],
      ref: 'Boards',
      required: false
    },
    activities: [{}],
    cards: [{}],
    createdBy: {
      type: Object,
      required: true
    },
},
{ timestamps: true },
);