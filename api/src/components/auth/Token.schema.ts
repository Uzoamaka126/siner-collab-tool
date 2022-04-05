import {  Document, Types, Schema } from "mongoose";

export interface IBaseToken {
    user_id?: Types.ObjectId;
    token?: string;
    createdAt?: Date;
}


export interface ITokenDocument extends IBaseToken, Document<Types.ObjectId> {
  _id: Types.ObjectId;
}

export const tokenSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,// this is the expiry time in seconds
    },
},
{ timestamps: true },
);
