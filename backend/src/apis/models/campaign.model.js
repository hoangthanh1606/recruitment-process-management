const mongoose = require('mongoose')

const { toJSON } = require('./plugins')

const campaignSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        technologies: {
            type: String,
            required: true,
        },
        positions: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        quantity:{
            type: Number,
            required: false,
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
)

campaignSchema.plugin(toJSON)

/**
 * @typedef Token
 */
const Campaign = mongoose.model('Campaigns', campaignSchema)

module.exports = Campaign
