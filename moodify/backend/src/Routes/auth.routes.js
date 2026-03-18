const {Router} =  require('express') ;
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')
const authController = require('../controllers/auth.controller')
router.post ('/register' ,  authController.registerController)
router.post ('/login' ,  authController.logInController)
router.get('/get-me' ,  authMiddleware.authUser ,authController.getmeController)
router.get('/logout' ,  authMiddleware.authUser ,authController.logout)
module.exports = router