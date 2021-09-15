const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user')
const { catchAsyncError } = require('../middlewares/error')
const { checkLoginAuth } = require('../middlewares/authority')

userRouter.post('/register', catchAsyncError(userController.register))
userRouter.post('/login', catchAsyncError(userController.login))
userRouter.get(
  '/me',
  catchAsyncError(checkLoginAuth),
  catchAsyncError(userController.getOneProfile)
)
userRouter.patch(
  '/me',
  catchAsyncError(checkLoginAuth),
  catchAsyncError(userController.editProfile)
)
userRouter.patch(
  '/me/updatePassword',
  catchAsyncError(checkLoginAuth),
  catchAsyncError(userController.updatePassword)
)
userRouter.delete(
  '/me',
  catchAsyncError(checkLoginAuth),
  catchAsyncError(userController.delete)
)

module.exports = userRouter
