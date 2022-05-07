const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const {mailService} = require('../services')

const SendMail = catchAsync(async (req, res) => {
    await mailService.sendMail()
    res.status(httpStatus.OK).json({
        message: 'Send mail successfully'
    })
})

module.exports = {
    SendMail
}
