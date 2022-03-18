const Joi = require('joi');
import { Request, Response, NextFunction } from 'express';

export async function validateFetchClientsQuery(req: Request, res: Response, next: NextFunction) {
    const query = req.query;

    const querySchema = Joi.object().keys({
        limit: Joi.string().default("10"),
        download: Joi.boolean().default(false),
        email: Joi.string().email(),
        name: Joi.string(),
        userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        page: Joi.string().default("1")
    });

    const { error, value } = querySchema.validate(query);

    if (error) {
        return res.status(400).json({
          message: error.details[0].message
        })
    } else {
        next();
    }
}