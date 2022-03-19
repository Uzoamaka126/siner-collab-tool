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
    client_name?: string
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
  data?: {
    info: IBaseProject[];
    pageDetails: {
      total: number;
      currentPage: number;
      totalPages: number;
      pageSize: number;
    };
  }
}

export type ProjectQueryData = {
    page?: number;
    limit?: number;
    offset?: number
    where?: any
}

export type QueryStringsProject = {
    page?: string;
    limit?: string;
    title?: string;
    clientName?: string;
    userId?: string;
    download?: string;
    date?: Date;
    status?: string;
}