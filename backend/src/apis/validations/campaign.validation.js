const Joi = require('joi')

const createNewCampaignSchema = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        technologies: Joi.string().required(),
        positions: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        image: Joi.string(),
        quantity: Joi.number(),
        isActive: Joi.boolean(),
    }),
}
module.exports = {
    createNewCampaignSchema,
}
