const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { campaignService } = require('../services')

const CreateCampaign = catchAsync(async (req, res) => {
    const campaign = await campaignService.createCampaign(req.body)
    res.status(httpStatus.CREATED).send({ campaign })
})

const GetAllCampaign = catchAsync(async (req, res) => {
    const campaign = await campaignService.getAllCampaigns(
        req.query.name,
        req.query.description,
        req.query.sort,
        req.query.status,
        req.params.page,
        req.query.positions,
        req.query.technologies
    )
    res.status(httpStatus.OK).send({ campaign })
})

const UpdateCampaign = catchAsync(async (req, res) => {
    const campaign = await campaignService.updateCampaign(req.params.id, req.body)
    res.status(httpStatus.OK).send({ campaign })
})

const GetCampaignIsActive = catchAsync(async (req, res) => {
    const campaign = await campaignService.getCampaignIsActive()
    res.status(httpStatus.OK).send({ campaign })
})

const ViewCampaignDetails = catchAsync(async (req, res) => {
    const campaign = await campaignService.campaignDetails(req.params.campaignId)
    res.status(httpStatus.OK).send({ campaign })
})

module.exports = {
    CreateCampaign,
    GetAllCampaign,
    UpdateCampaign,
    GetCampaignIsActive,
    ViewCampaignDetails,
}
