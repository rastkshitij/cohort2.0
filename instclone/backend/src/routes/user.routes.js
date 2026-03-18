const express=  require ('express') ;
const UserRouter =  express.Router();
const userController =  require('../controllers/user.controller')
const Identifyuser =  require ('../middlewares/auth.middleware')
UserRouter.post('/follow/:username' , Identifyuser , userController.followUserController)

UserRouter.post('/unfollow/:username' , Identifyuser , userController.unfollowUsercontroller)


module.exports = UserRouter