const express = require('express')
const postController = require('../controllers/post.controllers')
const postRouter = express.Router()
const multer = require('multer')
const upload = multer({ storage : multer.memoryStorage() })
const Identifyuser =  require ('../middlewares/auth.middleware')
postRouter.post('/',upload.single("image") , Identifyuser ,postController.createPostController)
postRouter.get('/' , Identifyuser, postController.getPostController)
postRouter.get('/details/:postId' , Identifyuser , postController.getPostDetails)
postRouter.post('/like/:postId'  , Identifyuser , postController.likePostController)
postRouter.post('/unlike/:postId'  , Identifyuser , postController.unlikePostController)
postRouter.get('/feed' , Identifyuser , postController.getfeedController)

module.exports = postRouter