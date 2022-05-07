const express = require('express')
const {campaignController, profileController} = require('../../controllers')
const { campaignValidation } = require('../../validations')
const validate = require('../../../middlewares/validate')
const {authMiddleware} = require('../../../middlewares/auth.middleware');

const router = express.Router()

router.post('/', authMiddleware, validate(campaignValidation.createNewCampaignSchema) ,campaignController.CreateCampaign)
router.get('/', authMiddleware, campaignController.GetAllCampaign)
router.patch('/:id', authMiddleware, validate(campaignValidation.createNewCampaignSchema), campaignController.UpdateCampaign)
router.get('/:campaignId/profile', authMiddleware, profileController.getAllProfileByCampaign)
router.get('/active', campaignController.GetCampaignIsActive)
router.get('/details/:campaignId', campaignController.ViewCampaignDetails)

module.exports = router
