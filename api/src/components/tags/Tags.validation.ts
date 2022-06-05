const Joi = require('joi');
import { Request, Response, NextFunction } from 'express';

export async function validateCreateInvoiceData(req: Request, res: Response, next: NextFunction) {
    const data = req.body;    

    const requestBodySchema = Joi.object().keys({
        client: Joi.object({
            id: Joi.string(),
            email: Joi.string().email(),
            firstName: Joi.string()
            lastName: Joi.string()
        }),
        client_email: Joi.string(),
        currency: Joi.string(),
        status: Joi.string(),
        title: Joi.string(),
        memo: Joi.string(),
        meta: {
            cc_emails: Joi.array().items(Joi.string()),
            tax: Joi.array().items(
                Joi.object({
                    tax_name: Joi.string(),
                    tax_type: Joi.string(),
                    tax_value: Joi.number(),
                })
            ),
            reminders: Joi.array().items(Joi.string()),
            items: Joi.array().items(
                Joi.object({
                    item_name: Joi.string(),
                    item_price: Joi.number(),
                    item_quantity: Joi.number(),
                    item_unit: Joi.number()
                })
            )
        },
        download: Joi.boolean().default(false),
        // user_id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        project_id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        date_paid: Joi.date(),
        due_date: Joi.date(),
        amount: Joi.number().required().greater(1)
    });

    const { error, value } = requestBodySchema.validate(data);
    
    console.log("error:", error);
    

    if (error) {
        return res.status(400).json({
          message: error.details[0].message
        })
    } else {
        next();
    }
}