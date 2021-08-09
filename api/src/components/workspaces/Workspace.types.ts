import { Document, Types } from "mongoose"

export interface IBaseWorkspace {
    title: string;
    type: string;
    description?: string;
    members?: {}[];
    activities?: {}[];
    boards?: {}[];
    cards?: {}[];
    createdBy: string
}
export interface IWorkspaceInput {
    title: IBaseWorkspace['title'];
    type: IBaseWorkspace['type'];
    description?: IBaseWorkspace['description'];
    boards?: IBaseWorkspace['boards'];
    members?: IBaseWorkspace['members'];
    activities?: IBaseWorkspace['activities'];
    cards?: IBaseWorkspace['cards'];
    createdBy: IBaseWorkspace['createdBy'];
}

export interface IUserBaseDocument extends IBaseWorkspace, Document<Types.ObjectId> {
  _id: Types.ObjectId;
  /**
   * Virtual path with full name of the user
   */
  fullName: string;
  workspaces: Types.ObjectId[];
//   workspaces: Types.ObjectId[] | WorkspaceDocument[];
  /**
   * Hashes and compares given string to the existing user password
   * @param password password to compare with currently saved password
   */
  comparePassword(password: string): Promise<boolean>;
  /**
   * Sends an email confirmation link to the user's email.
   */
  sendEmailConfirm(): Promise<void>;
  /**
   * Generates access token JWT for the user.
   */
  generateAccessToken(): string;
  /**
   * Generates refresh token JWT for the user and stores it in the RefreshToken collection.
   */
  generateRefreshToken(): Promise<string>;
}

export interface IUserDocument extends IUserBaseDocument {
//   workspaces: Types.Array<WorkspaceDocument["_id"]>;
}

export interface IUserCreateDataResponse {
    status: number;
    isSuccessful: boolean;
    message: string;
    data?: IBaseWorkspace
}