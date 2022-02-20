import { Document, Types } from "mongoose"
import { ProjectTag } from "../tags/Tags.types";

// Define a document interface for its related moongoose schema, in this case, the Client schema
export interface IBaseProject {
    title: string;
    user_id: string;
    tasks?: [];
    client_id: string;
    invoices?: [];
    status?: boolean;
    deadline?: Date | null
    tags?: ProjectTag[];
}

export interface IProjectCreatePayload {
    title: string;
    user_id: string;
    tasks?: [];
    client_id: string;
    invoices?: [];
    status?: boolean;
    deadline?: Date | null
    tags?: []
}
/** 
 * The IWorkspaceBaseDocument is for additional properties or methods you want to add to a schema
 *  **/
export interface IProjectDocument extends IBaseProject, Document<Types.ObjectId>  {
  _id: Types.ObjectId;
}

export interface IProjectCreateResponse {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: IProjectCreatePayload
}

export interface IProjectFetchResponse {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: IBaseProject | null
}