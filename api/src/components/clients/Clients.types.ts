import { Document, Types } from "mongoose"

// Define a document interface for its related moongoose schema, in this case, the Client schema
export interface IBaseClient {
    name: string;
    user_id: string
}

export interface IClientRequestPayload {
    name: IBaseClient['name'];
    user_id: IBaseClient['user_id']; 
    // user_id: string; 
}

export interface IClientSingleRequestPayload {
    id: string
    user_id: IBaseClient['user_id']; 
    // user_id: string; 
}

/** 
 * The IWorkspaceBaseDocument is for additional properties or methods you want to add to a schema
 *  **/
export interface IClientDocument extends IBaseClient, Document<Types.ObjectId> {
  _id: Types.ObjectId;
}

export interface IClientCreateResponse {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: IBaseClient
}

export interface IClientFetchAllResponse {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: IBaseClient[]
}