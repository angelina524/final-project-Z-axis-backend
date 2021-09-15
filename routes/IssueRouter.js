const express = require('express')
const issueRouter = express.Router()
const issueController = require('../controllers/issue')
const { catchAsyncError } = require('../middlewares/error')
const { checkLoginAuth, checkAuth } = require('../middlewares/authority')

issueRouter.post(
  '/',
  catchAsyncError(checkLoginAuth),
  catchAsyncError(issueController.add)
)
issueRouter.delete(
  '/:issueId',
  catchAsyncError(checkAuth),
  catchAsyncError(issueController.delete)
)
issueRouter.patch(
  '/:issueId',
  catchAsyncError(checkAuth),
  catchAsyncError(issueController.patch)
)
issueRouter.get(
  '/',
  catchAsyncError(checkAuth),
  catchAsyncError(issueController.getAll)
)
issueRouter.get('/:issueId', catchAsyncError(issueController.getOne))

module.exports = issueRouter
