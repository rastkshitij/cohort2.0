const express =require('express')
const authRouter = express()
const authController = require('../controllers/auth.controllers')
const identifyUser = require('../middlewares/auth.middleware')

authRouter.post('/register' ,authController.registerCOntroller )

authRouter.post('/login' , authController.loginController)

authRouter.get('/get-me' , identifyUser ,  authController.getMeController)
module.exports = authRouter