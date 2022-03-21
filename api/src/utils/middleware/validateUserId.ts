const Joi = require('joi');
import { Response, NextFunction } from 'express';
import { RequestCustom } from './express';


export async function validateUserId(req: RequestCustom, res: Response, next: NextFunction) {
    const user_id = req.user._id

    const userIdSchema = Joi.string().regex(/^[a-fA-F0-9]{24}$/).required();

    const { error, value } = userIdSchema.validate(user_id);

    if (error) {
        return res.status(400).json({
          message: error.details[0].message
        })
    } else {
        next();
    }
}