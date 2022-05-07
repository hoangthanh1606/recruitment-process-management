const express = require('express')
const router = express.Router()
const {mailController} = require('../../controllers')

router.post('/', mailController.SendMail)

module.exports = router