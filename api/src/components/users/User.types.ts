import { Document, Types } from "mongoose"

export interface IBaseUser {
    fullName: string;
    email: string;
    password: string;
    username: string;
    jwt?: string;
    phoneNumber?: string;
    createdAt?: Date;
}

export interface IBaseUserLogin {
  email: string;
  password: string;
}

// export type UsersType = IBaseUser[]
export interface IUserInput {
    fullName: IBaseUser['fullName'];
    email: IBaseUser['email'];
    password: IBaseUser['password'];
    username: IBaseUser['username'];
    phoneNumber: IBaseUser['phoneNumber'];
    jwt: IBaseUser['jwt'];
}

export interface IUserBaseDocument extends IBaseUser, Document<Types.ObjectId> {
  _id: Types.ObjectId;
  /**
   * Virtual path with full name of the user
   */
//   workspaces: Types.ObjectId[] | WorkspaceDocument[];
  /**
   * Hashes and compares given string to the existing user password
   * @param password password to compare with currently saved password
   */

  checkPassword(): Promise<void>;

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

export interface IUserCreateDataResponse {
    status: number;
    isSuccessful: boolean;
    message: string;
    data?: IBaseUser
}