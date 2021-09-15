const express = require('express')
const commentRouter = express.Router({ mergeParams: true })
const commentController = require('../controllers/comment')
const { catchAsyncError } = require('../middlewares/error')

commentRouter.post('/', catchAsyncError(commentController.addComment))
commentRouter.delete(
  '/:commentId',
  catchAsyncError(commentController.deleteComment)
)
commentRouter.patch(
  '/:commentId',
  catchAsyncError(commentController.editComment)
)
commentRouter.patch(
  '/:commentId/replies',
  catchAsyncError(commentController.editReply)
)

module.exports = commentRouter
