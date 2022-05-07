const express = require('express')
const {profileController} = require('../../controllers')
const { profileValidation } = require('../../validations')
const validate = require('../../../middlewares/validate')
const {authMiddleware} = require('../../../middlewares/auth.middleware');
const {multer} = require ('../../../middlewares/firebase')

const router = express.Router()

router.post('/', multer ,profileController.UserApplyToCampaign)
router.get('/details/:profileId', profileController.viewProfileDetails)
router.patch('/:id',authMiddleware, profileController.HRChangeStatusProfile)

module.exports = router
