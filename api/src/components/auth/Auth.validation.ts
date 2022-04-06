const Joi = require('joi');
import { Request, Response, NextFunction } from 'express';

export async function validateSignUpData(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const signUpSchema = Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email({ allowFullyQualified: true }).required(),
        password: Joi.string().min(5).max(20).required(),
        fullName: Joi.string().min(2).max(200).required(),
    });

    const { error, value } = signUpSchema.validate(data);

    if (error) {
        return res.status(400).json({
          message: error.details[0].message
        })
    } else {
        next();
    }
}

export async function validateSignInData(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const signUpSchema = Joi.object().keys({
        username: Joi.string(),
        email: Joi.string().email({ allowFullyQualified: true }),
        password: Joi.string().min(5).max(20).required(),
    });

    const { error, value } = signUpSchema.validate(data);

    if (error) {
        return res.status(400).json({
          message: error.details[0].message
        })
    } else {
        next();
    }
}

export async function initiatePasswordResetSchema(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const resetEmailSchema = Joi.object().keys({
        email: Joi.string().email({ allowFullyQualified: true }).required(),
    });

    const { error } = resetEmailSchema.validate(data);

    if (error) {
        return res.status(400).json({
          message: error.details[0].message
        })
    } else {
        next();
    }
}

export async function completePasswordRequestSchema(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const resetEmailSchema = Joi.object().keys({
        email: Joi.string().email({ allowFullyQualified: true }),
        token: Joi.string().min(5).required(),
        password: Joi.string().min(5).max(20).required(),
        confirm_password: Joi.string().min(5).max(20).required(),
    });

    const { error } = resetEmailSchema.validate(data);

    if (error) {
        return res.status(400).json({
          message: error.details[0].message
        })
    } else {
        next();
    }
}