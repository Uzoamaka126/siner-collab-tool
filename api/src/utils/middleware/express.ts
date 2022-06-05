import { Request } from 'express';

export interface RequestCustom extends Request {
    user: {
        _id?: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        username: string;
        jwt?: string;
    }
}