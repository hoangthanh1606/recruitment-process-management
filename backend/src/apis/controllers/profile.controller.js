const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { profileService } = require('../services')

const UserApplyToCampaign = catchAsync(async (req, res) => {
    const profile = await profileService.userCreateNewProfile(req.body, req.body.full_name, req.body.email, req.file)
    res.status(httpStatus.CREATED).send({ profile })
})

const viewProfileDetails = catchAsync(async (req, res) => {
    const profile = await profileService.profileDetails(req.params.profileId)
    res.status(httpStatus.OK).send(profile)
})

const getAllProfileByCampaign = catchAsync(async(req, res) => {
    const profile = await profileService.listProfileByCampaign(req.params.campaignId, req.query.full_name, req.query.email, req.query.status, req.query.phone_number)
    res.status(httpStatus.OK).send(profile)
})

const HRChangeStatusProfile = catchAsync(async(req, res) => {
    const profile = await profileService.changeStatusProfile(req.params.id, req.body, req.query.status)
    res.status(httpStatus.OK).send(profile)
})

module.exports = {
    UserApplyToCampaign,
    viewProfileDetails,
    getAllProfileByCampaign,
    HRChangeStatusProfile
}
