const Joi = require('joi');
import { Response, NextFunction } from 'express';
import { RequestCustom } from './express';


export async function validateUserId(req: RequestCustom, res: Response, next: NextFunction) {
    const user_id = req.user._id

    const querySchema = Joi.object().keys({
        user_id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    });

    const { error, value } = querySchema.validate(user_id);

    if (error) {
        return res.status(400).json({
          message: error.details[0].message
        })
    } else {
        next();
    }
}