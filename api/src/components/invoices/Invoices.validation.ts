const Joi = require('joi');
import { Request, Response, NextFunction } from 'express';

export async function validateFetchProjectsQuery(req: Request, res: Response, next: NextFunction) {
    const query = req.query;

    const querySchema = Joi.object().keys({
        limit: Joi.string().default("10"),
        download: Joi.boolean().default(false),
        title: Joi.string(),
        clientName: Joi.string(),
        userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
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

export async function validateUserId(req: Request, res: Response, next: NextFunction) {
    const user_id = req.body.user_id;

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

export async function validateProjectId(req: Request, res: Response, next: NextFunction) {
    const project_id = req.body.project_id;

    const querySchema = Joi.object().keys({
        project_id:  Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    });

    const { error, value } = querySchema.validate(project_id);

    if (error) {
        return res.status(400).json({
          message: error.details[0].message
        })
    } else {
        next();
    }
}

export async function validateCreateInvoiceData(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const requestBodySchema = Joi.object().keys({
        client_email: Joi.string(),
        currency: Joi.string(),
        status: Joi.string(),
        title: Joi.string(),
        memo: Joi.string(),
        meta: Joi.object({
            cc_emails: Joi.array().items(Joi.string()),
            tax: Joi.array().items(
                Joi.object({
                    tax_name: Joi.string(),
                    tax_type: Joi.string(),
                    tax_value: Joi.number(),
                    tax_description: Joi.string(),
                })
            ),
            reminders: Joi.array().items(),
            items: Joi.array().items(
                Joi.object({
                    item_name: Joi.string(),
                    item_price: Joi.number(),
                    item_quantity: Joi.number(),
                    item_unit: Joi.number(),
                })
            )
        }),
        download: Joi.boolean().default(false),
        user_id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        project_id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        date_paid: Joi.date(),
        due_date: Joi.date(),
        amount: Joi.number().required().greater(1)
    });

    const { error, value } = requestBodySchema.validate(data);

    if (error) {
        return res.status(400).json({
          message: error.details[0].message
        })
    } else {
        next();
    }
}
