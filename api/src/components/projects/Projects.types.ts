import { Document, Types } from "mongoose"

// Define a document interface for its related moongoose schema, in this case, the Client schema
export interface IBaseProject{
    title: string;
    user_id: string;
    tasks?: [];
    client_id: string;
}

export interface IProjectCreatePayload {
    title: string;
    user_id: string;
    tasks?: [];
    client_id: string;
}
/** 
 * The IWorkspaceBaseDocument is for additional properties or methods you want to add to a schema
 *  **/
export interface IProjectDocument extends IBaseProject, Document<Types.ObjectId>  {
  _id: Types.ObjectId;
}

export interface IClientCreateResponse {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: IProjectCreatePayload
}

export interface IClientFetchAllResponse {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: IProjectCreatePayload[]
}