const Joi = require('joi');

export const querySchema = Joi.object().keys({
    limit: Joi.string().default("10"),
    download: Joi.boolean().default(false),
    email: Joi.string().email(),
    userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    page: Joi.string().default("1")
});