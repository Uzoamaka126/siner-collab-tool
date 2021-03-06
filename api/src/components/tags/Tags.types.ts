import { Document, Types } from "mongoose";

// Define a document interface for its related moongoose schema, in this case, the Client schema
export interface IBaseTag {
    name: string;
    user_id?: string
}

export interface ProjectTag {
  name: string;
  _id: Types.ObjectId;
  createdAt?: any
  updatedAt?: any
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
  data?: {
    info: ITagDocument[],
    pageDetails: {
      total?: number,
      currentPage?: number,
      totalPages?: number,
      pageSize?: number
    }
  }
}

export interface ITagResponsePayload {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: ITagDocument[];
}

export type TagQueryData = {
  page?: number;
  limit?: number;
  offset?: number
  where?: any
}

export type QueryStringsTag = {
  page?: string;
  limit?: string;
  download?: string;
  name?: string;
  projectId?: string;
}