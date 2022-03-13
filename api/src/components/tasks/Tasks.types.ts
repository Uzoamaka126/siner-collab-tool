import { Document, Types } from "mongoose";

// Define a document interface for its related moongoose schema, in this case, the Client schema
export interface IBaseTask {
    name: string;
    project_id?: string
    isCompleted: boolean;
    priorityLabel: string,
    deadline: Date
}
/** 
 * The ITagDocument is for additional properties or methods you want to add to a schema
 *  **/

export interface ITaskDocument extends IBaseTask, Document<Types.ObjectId> {
  _id: Types.ObjectId;
}

export interface ICreateTaskRequestPayload {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: IBaseTask[]
}

export interface ITaskResponsePayload {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: IBaseTask
}