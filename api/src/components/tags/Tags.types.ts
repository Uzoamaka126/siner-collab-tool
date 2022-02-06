import { Document, Types } from "mongoose";

// Define a document interface for its related moongoose schema, in this case, the Client schema
export interface IBaseTag {
    name: string;
    user_id: string
}

/** 
 * The IWorkspaceBaseDocument is for additional properties or methods you want to add to a schema
 *  **/
export interface ITagDocument extends IBaseTag, Document<Types.ObjectId> {
  _id: Types.ObjectId;
}

export interface ITagsResponsePayload {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: ITagDocument[]
}

export interface ITagResponsePayload {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: ITagDocument
}