import { Request } from 'express';

export interface RequestCustom extends Request {
    user: {
        _id?: string;
        fullName: string;
        email: string;
        password: string;
        username: string;
        jwt?: string;
    }
}