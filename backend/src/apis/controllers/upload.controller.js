const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const {uploadService} = require('../services')


const UploadFile = catchAsync(async (req, res) => {
    const file = req.file
    const url = await uploadService.uploadFile(file)
    res.status(httpStatus.OK).json({
        url
    })
})

module.exports = {
    UploadFile
}