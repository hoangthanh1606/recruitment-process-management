const Joi = require('joi')

const userCreateNewProfileSchema = {
    body: Joi.object().keys({
        full_name: Joi.string().required(),
        email: Joi.string().required(),
        phone_number: Joi.string().required(),
        link_cv: Joi.string().required(),
        campaignId: Joi.string().insensitive().prefs({convert: true})
    }),
}
module.exports = {
    userCreateNewProfileSchema,
}
