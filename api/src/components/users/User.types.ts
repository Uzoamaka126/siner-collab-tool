import { Document } from "mongoose"

export interface IUserType extends Document {
    fullName: string;
    email: string;
    password: string;
    username: string;
    bio?: string;
    workspaces?: {}[];
    activities?: {}[];
    cards?: {}[];
    createdAt: Date;
}

// export type UsersType = IUserType[]
export interface IUserInput {
    fullName: IUserType['fullName'];
    email: IUserType['email'];
    password: IUserType['password'];
    username: IUserType['username'];
    bio?: IUserType['bio'];
    workspaces?: IUserType['workspaces'];
    activities?: IUserType['activities'];
    cards?: IUserType['cards'];
    createdAt: IUserType['createdAt'];
}