import { Request, Response, NextFunction,  } from 'express';
import { checkForDuplicateEmailsDB, checkForDuplicateUsernameDB } from '../validators/authDb';
import { RequestCustom } from './express';

export const checkForDuplicateEmails = async (req: Request, res: Response, next: NextFunction) => {
    if(req.body.type === 'signup') {
        const result = await checkForDuplicateEmailsDB(req.body.email);
        if (result === true) {
            return res.status(201).json({
                status: 200,
                isSuccessful: false,
                message: "This email exists!",
                data: null
            })
        } else if (result === null) {
            return res.status(201).json({
                status: 200,
                isSuccessful: false,
                message: "An error occured. Please, try again!",
                data: null
            })
        } else {
            next();
        }
    } else {
        next();
    }
}

export const checkForDuplicateUsername = async (req: RequestCustom, res: Response, next: NextFunction) => {
    if(req.body.type === 'signup') {
        const result = await checkForDuplicateUsernameDB(req.user.username);
        if (result === true) {
            return res.status(201).json({
                status: 200,
                isSuccessful: false,
                message: "This username has already been taken!",
                data: null
            })
        } else if (result === null) {
            return res.status(201).json({
                status: 200,
                isSuccessful: false,
                message: "An error occured. Please, try again!",
                data: null
            })
        } else {
            next();
        }
    } else {
        next()
    }
}

export const authMiddleware = [
    checkForDuplicateUsername,
    checkForDuplicateEmails,
]