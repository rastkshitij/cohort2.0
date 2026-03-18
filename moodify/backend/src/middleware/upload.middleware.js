const multer = require('multer')
const storage =  multer.memoryStorage()
const upload = multer({
    storage :  storage, 
    limits : {
        fileSize : 1024 *1024 *5   // maximu  5mb ki file hi uploaD HOGA NAHI TOh error de dega
    }
})

module.exports = upload