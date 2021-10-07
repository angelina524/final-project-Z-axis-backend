const express = require('express')
const relationRouter = express.Router()
const relationController = require('../controllers/relation')
const { checkGuestTokenOrUserId } = require('../middlewares/authority')
const { catchAsyncError } = require('../middlewares/error')

relationRouter.get(
  '/',
  catchAsyncError(checkGuestTokenOrUserId),
  catchAsyncError(relationController.getRelation)
)

module.exports = relationRouter
