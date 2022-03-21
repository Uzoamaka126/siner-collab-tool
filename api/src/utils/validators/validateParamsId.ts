const Joi = require('joi');
import { Request, Response, NextFunction } from 'express';


export async function validateParamsId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const querySchema = Joi.string().regex(/^[a-fA-F0-9]{24}$/).required();

    const { error, value } = querySchema.validate(id);

    if (error) {
        return res.status(400).json({
          message: error.details[0].message
        })
    } else {
        next();
    }
}