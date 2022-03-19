import { Document, Types } from "mongoose"

// Define a document interface for its related moongoose schema, in this case, the Client schema
export interface IBaseClient {
    name: string;
    user_id: string;
    email: string;
    // projects: [];
    phone_number: string;
    country: string;
    address: string;
}

export interface IClientRequestPayload {
    name: IBaseClient['name'];
    user_id: IBaseClient['user_id']; 
    email: IBaseClient['email']
    phone_number: IBaseClient['phone_number']
    country: IBaseClient['country']
    address: IBaseClient['address']
}

export interface IClientSingleRequestPayload {
    id: string
    user_id: IBaseClient['user_id']; 
    // user_id: string; 
}

export interface IClientPayload {
    id: Types.ObjectId;
    name: string;
}

export interface IClientProjectsPayload {
    id: Types.ObjectId;
    project_id: string;
    // user_id: string; 
}

export interface PageDetails {
  total: number,
  currentPage: number;
  totalPages: number;
  pageSize: number
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
  // data?: IBaseClient[],
  data?: {
    info: IBaseClient[],
    pageDetails: PageDetails
  }
}

export type ClientQueryData = {
    page?: number;
    limit?: number;
    offset?: number
    where?: any
}

export type QueryStringsClient = {
    page?: string;
    limit?: string;
    email?: string;
    name?: string;
    userId?: string;
    download?: string;
}