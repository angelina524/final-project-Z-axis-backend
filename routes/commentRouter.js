const express = require('express')
const commentRouter = express.Router({ mergeParams: true })
const commentController = require('../controllers/comment')
const { catchAsyncError } = require('../middlewares/error')
const {
  checkGuestToken,
  checkGuestAuth,
  checkUserAuth,
  checkGuestOrUserAuth,
  checkGuestTokenOrUserId
} = require('../middlewares/authority')

commentRouter.post(
  '/',
  catchAsyncError(checkGuestToken),
  catchAsyncError(commentController.addComment)
)
commentRouter.delete(
  '/:commentId',
  catchAsyncError(checkGuestOrUserAuth),
  catchAsyncError(commentController.deleteComment)
)
commentRouter.patch(
  '/:commentId',
  catchAsyncError(checkGuestAuth),
  catchAsyncError(commentController.editComment)
)
commentRouter.patch(
  '/:commentId/likes',
  catchAsyncError(checkGuestTokenOrUserId),
  catchAsyncError(commentController.likesComment) // 待補：按讚 controller
)
commentRouter.patch(
  '/:commentId/top',
  catchAsyncError(checkUserAuth),
  catchAsyncError(commentController.commentOnTop)
)
commentRouter.patch(
  '/:commentId/replies',
  catchAsyncError(checkUserAuth),
  catchAsyncError(commentController.editReply)
)
commentRouter.get('/', catchAsyncError(commentController.getAllComments))

module.exports = commentRouter
