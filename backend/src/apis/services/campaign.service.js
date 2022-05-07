const { Campaign } = require('../models')

/**
 * Create a campaign
 * @param {Object} campaignBody
 * @returns {Promise<Campaign>}
 */
const createCampaign = async (campaignBody) => {
    return Campaign.create(campaignBody)
}

/**
 * Get list
 * @param {Object} campaignBody
 * @returns {Promise<Campaign>}
 */
const getAllCampaigns = async (name = '', description = '', sort = 'time', status, page = 1,positions= '', technologies = '' ) => {
    let totalPage;
    const limit = 5;
    let countCP = await Campaign.estimatedDocumentCount();
    if (status !== 'true' && status !== 'false' && status !== undefined) {
        throw new Error('Status must be a boolean')
    }
    switch (sort) {
        case 'time':
            if (status && status.length > 0) {
                return Campaign.find({
                    name: {$in: name.split(',').map(na => new RegExp(na, 'i'))},
                    description: {$in: description.split(',').map(des => new RegExp(des, 'i'))},
                    positions: {$in: positions.split(',').map(pos => new RegExp(pos, 'i'))},
                    technologies: {$in: technologies.split(',').map(tech => new RegExp(tech, 'i'))},
                    isActive: status,
                })
                    .sort({ startDate: -1 })
                    .skip((page - 1) * limit)
            } else {
                return Campaign.find({
                    name: {$in: name.split(',').map(na => new RegExp(na, 'i'))},
                    description: {$in: description.split(',').map(des => new RegExp(des, 'i'))},
                    positions: {$in: positions.split(',').map(pos => new RegExp(pos, 'i'))},
                    technologies: {$in: technologies.split(',').map(tech => new RegExp(tech, 'i'))}, })
                    .sort({ startDate: -1 })
                    .skip((page - 1) * limit)
            }
        case 'quantity':
            if (status && status.length > 0) {
                return Campaign.find({
                    name: {$in: name.split(',').map(na => new RegExp(na, 'i'))},
                    description: {$in: description.split(',').map(des => new RegExp(des, 'i'))},
                    positions: {$in: positions.split(',').map(pos => new RegExp(pos, 'i'))},
                    technologies: {$in: technologies.split(',').map(tech => new RegExp(tech, 'i'))},
                    isActive: status,
                })
                    .sort({ quantity: -1 })
                    .skip((page - 1) * limit)
            } else {
                return Campaign.find({
                    name: {$in: name.split(',').map(na => new RegExp(na, 'i'))},
                    description: {$in: description.split(',').map(des => new RegExp(des, 'i'))},
                    positions: {$in: positions.split(',').map(pos => new RegExp(pos, 'i'))},
                    technologies: {$in: technologies.split(',').map(tech => new RegExp(tech, 'i'))}, })
                    .sort({ quantity: -1 })
                    .skip((page - 1) * limit)
            }
        default:
            if (status && status.length > 0) {
                return Campaign.find({
                    name: {$in: name.split(',').map(na => new RegExp(na, 'i'))},
                    description: {$in: description.split(',').map(des => new RegExp(des, 'i'))},
                    positions: {$in: positions.split(',').map(pos => new RegExp(pos, 'i'))},
                    technologies: {$in: technologies.split(',').map(tech => new RegExp(tech, 'i'))},
                    isActive: status,
                })
                    .sort({ startDate: -1 })
                    .skip((page - 1) * limit)
            } else {
                const campaignFound = Campaign.find({
                    name: {$in: name.split(',').map(na => new RegExp(na, 'i'))},
                    description: {$in: description.split(',').map(des => new RegExp(des, 'i'))},
                    positions: {$in: positions.split(',').map(pos => new RegExp(pos, 'i'))},
                    technologies: {$in: technologies.split(',').map(tech => new RegExp(tech, 'i'))}, })
                .sort({ startDate: -1 })
                .skip((page - 1) * limit)
                totalPage = Math.ceil(countCP / limit);
                return {totalPage, campaignFound}
            }
    }
}

const updateCampaign = async (id, campaignBody) => {
    const campaign = await Campaign.findOne({ _id: id })
    Object.keys(campaignBody).forEach((key) => {
        campaign[key] = campaignBody[key]
    })
    await campaign.save()
    return campaign
}

const getCampaignIsActive = async() => {
    return await Campaign.find({isActive: true})
}

const campaignDetails = async(campaignId) => {
    return await Campaign.findOne({_id: campaignId})
}

module.exports = {
    createCampaign,
    getAllCampaigns,
    updateCampaign,
    getCampaignIsActive,
    campaignDetails
}
