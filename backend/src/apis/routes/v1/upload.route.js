const express = require('express')
const router = express.Router()
const {uploadController} = require('../../controllers')
const {multer} = require ('../../../middlewares/firebase')

router.post('/',multer , uploadController.UploadFile)


module.exports = router