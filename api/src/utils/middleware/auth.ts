import { Request, Response, NextFunction,  } from 'express';
import { checkForDuplicateEmailsDB } from '../isEmail';

export const checkPasswordLength = (req: Request, res: Response, next: NextFunction) => {
    if(req.body.password && typeof req.body.password !== 'string') {
        return res.status(201).json({
            status: 200,
            isSuccessful: true,
            message: "Password should be a string",
            data: null
        })
    } else if (req.body.password && req.body.password.length < 8) {
        return res.status(201).json({
            status: 200,
            isSuccessful: true,
            message: "Password length should be up to 8 characters",
            data: null
        })
    } else {
        next()
    }
}

export const checkForDuplicateEmails = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.email && typeof req.body.email !== 'string') {
        return res.status(201).json({
            status: 200,
            isSuccessful: true,
            message: "Email should be a string",
            data: null
        })
    }
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
}
