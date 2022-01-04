import { Document, Types } from "mongoose"

// Define a document interface for its related moongoose schema, in this case, the Client schema
export interface IBaseClient {
    name: string;
}

/** 
 * The IWorkspaceBaseDocument is for additional properties or methods you want to add to a schema
 *  **/
export interface IClientDocument extends IBaseClient, Document<Types.ObjectId> {
  _id: Types.ObjectId;
}

export interface IUserCreateDataResponse {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: IBaseClient
}