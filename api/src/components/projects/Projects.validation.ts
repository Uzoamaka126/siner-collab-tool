const Joi = require('joi');
import { Request, Response, NextFunction } from 'express';

export async function validateFetchProjectsQuery(req: Request, res: Response, next: NextFunction) {
    const query = req.query;

    const querySchema = Joi.object().keys({
        limit: Joi.string().default("10"),
        download: Joi.boolean().default(false),
        title: Joi.string(),
        clientName: Joi.string(),
        page: Joi.string().default("1"),
        date: Joi.date(),
        status: Joi.string()
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