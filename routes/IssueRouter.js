const express = require('express')
const issueRouter = express.Router()
const issueController = require('../controllers/issue')
const { catchAsyncError } = require('../middlewares/error')
const { checkLoginAuth, checkUserAuth } = require('../middlewares/authority')

issueRouter.post(
  '/',
  catchAsyncError(checkLoginAuth),
  catchAsyncError(issueController.add)
)
issueRouter.delete(
  '/:issueId',
  catchAsyncError(checkUserAuth),
  catchAsyncError(issueController.delete)
)
issueRouter.patch(
  '/:issueId',
  catchAsyncError(checkUserAuth),
  catchAsyncError(issueController.patch)
)
issueRouter.patch(
  '/:issueId/pinCommentOnTop',
  catchAsyncError(checkUserAuth),
  catchAsyncError(issueController.pinCommentOnTop) // 待補：置頂 controller + 資料庫欄位
)
issueRouter.get(
  '/',
  catchAsyncError(checkLoginAuth),
  catchAsyncError(issueController.getAll)
)
issueRouter.get('/:issueURL', catchAsyncError(issueController.getOne))

module.exports = issueRouter
