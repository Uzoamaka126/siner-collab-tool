import { Request, Response, NextFunction,  } from 'express';
import { checkForDuplicateEmailsDB, checkForDuplicateUsernameDB } from '../validators/authDb';

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

export const checkForDuplicateUsername = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.username && typeof req.body.username !== 'string') {
        return res.status(201).json({
            status: 200,
            isSuccessful: true,
            message: "Username should be a string",
            data: null
        })
    }
    if(req.body.type === 'signup') {
        const result = await checkForDuplicateUsernameDB(req.body.username);
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