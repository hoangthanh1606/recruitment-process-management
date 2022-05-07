const mongoose = require('mongoose')

const { toJSON } = require('./plugins')

const profileSchema = mongoose.Schema(
    {
        full_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            required: true,
        },
        link_cv: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'New',
        },
        process:{
            type: String,
        },
        campaignId: {type: mongoose.Schema.Types.ObjectId, ref: "Campaigns" },
    },
    {
        timestamps: true,
    }
)

profileSchema.plugin(toJSON)

/**
 * @typedef Token
 */
const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile
