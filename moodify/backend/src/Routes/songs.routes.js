const express =  require("express")
const router =  express.Router()
const upload =  require('../middleware/upload.middleware')
const songController =  require('../controllers/songs.controller')
router.post('/' , upload.single("songs") , songController.uploadSong )

module.exports =  router