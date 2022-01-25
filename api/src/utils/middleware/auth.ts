import { Request, Response, NextFunction,  } from 'express';
import { checkForDuplicateEmailsDB, checkForDuplicateUsernameDB } from '../validators/authDb';
import { isEmpty } from '../validators/inputValidator';
import { ErrorTypes } from '../types';

export const checkPasswordLength = (req: Request, res: Response, next: NextFunction) => {
    if(req.body.password && typeof req.body.password !== 'string') {
        return res.status(201).json({
            status: 200,
            isSuccessful: false,
            message: "Password should be a string",
            data: null
        })
    } else if (req.body.password && req.body.password.length < 8) {
        return res.status(201).json({
            status: 200,
            isSuccessful: false,
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

exports.validateSignupData = async (req: Request, res: Response, next: NextFunction) => {
  let { username, email, password, fullName } = req.body;
  let errors: ErrorTypes = {};

  if (isEmpty(password)) {
    errors.password = "Must not be empty";
  }

  if (isEmpty(username)) {
    errors.username = "Must not be empty";
  }

  if (isEmpty(fullName)) {
    errors.fullName = "Must not be empty";
  }

  if (Object.keys(errors).length)
    return res.status(400).json({
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    });
  next();
};

exports.validateLoginData = async (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;
  let errors: ErrorTypes = {};

  if (isEmpty(email)) {
    errors.email = "Email is required";
  }

  if (isEmpty(password)) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length)
    return res.status(400).json({
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    });
  next();
};

export const authMiddleware = [
    checkForDuplicateUsername,
    checkForDuplicateEmails,
    checkPasswordLength
]