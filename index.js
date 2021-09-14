const express = require('express')
const dotenv = require('dotenv')

const { errorHandler, catchAsyncError } = require('./middlewares/error')
const { checkLoginAuth } = require('./middlewares/authority')
const userController = require('./controllers/user')
const commentController = require('./controllers/comment')

const issueRouter = require('./routes/IssueRouter')

const app = express()
const result = dotenv.config()
if (result.error) {
  throw result.error
}
const { PORT } = result.parsed
const port = PORT || 5001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// user
app.post('/users/register', catchAsyncError(userController.register))
app.post('/users/login', catchAsyncError(userController.login))
app.get(
  '/users/me',
  catchAsyncError(checkLoginAuth),
  catchAsyncError(userController.getOneProfile)
)
app.patch(
  '/users/me',
  catchAsyncError(checkLoginAuth),
  catchAsyncError(userController.editProfile)
)
app.patch(
  '/users/me/updatePassword',
  catchAsyncError(checkLoginAuth),
  catchAsyncError(userController.updatePassword)
)
app.delete(
  '/users/me',
  catchAsyncError(checkLoginAuth),
  catchAsyncError(userController.delete)
)

// issue path
// app.post(
//   '/issues',
//   catchAsyncError(checkLoginAuth),
//   catchAsyncError(issueController.add)
// )
// app.delete('/issues/:issueId', catchAsyncError(issueController.delete))
// app.patch('/issues/:issueId', catchAsyncError(issueController.patch))
// app.get('/issues', catchAsyncError(issueController.getAll))
// app.get('/issues/:issueId', catchAsyncError(issueController.getOne))
app.use('/issue', issueRouter)

// comment path
app.post(
  '/issues/:issueId/comments',
  catchAsyncError(commentController.addComment)
)
app.delete(
  '/issues/:issueId/comments/:commentId',
  catchAsyncError(commentController.deleteComment)
)
app.patch(
  '/issues/:issueId/comments/:commentId',
  catchAsyncError(commentController.editComment)
)
app.patch(
  '/issues/:issueId/comments/:commentId/replies',
  catchAsyncError(commentController.editReply)
)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
