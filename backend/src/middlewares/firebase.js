const Multer = require('multer')


const multer = Multer({
    storage: Multer.memoryStorage(),
}).single('file')


module.exports = {
    multer
}