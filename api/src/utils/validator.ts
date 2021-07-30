import { Request, Response, NextFunction,  } from 'express';
import { isEmpty } from './isEmpty';
import { ErrorTypes } from './types';

exports.validateSignupData = async (req: Request, res: Response, next: NextFunction) => {
  let { username, email, password, fullName } = req.body;
  let errors: ErrorTypes = {};

  if (isEmpty(email)) {
    errors.email = "Must not be empty";
  }

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

req.body = { username, email, password };
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