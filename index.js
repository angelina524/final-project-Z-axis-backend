const express = require('express')
const dotenv = require('dotenv')

const { errorHandler } = require('./middlewares/error')
const userController = require('./controllers/user')
const issueController = require('./controllers/issue')
const commentController = require('./controllers/comment')

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
app.post('/users/register', userController.register)
app.post('/users/login', userController.login)
app.get('/users/me', userController.getOneProfile)
app.patch('/users/me', userController.editProfile)
app.patch('/users/updatePassword', userController.updatePassword)

// issue path
app.post('/issues', issueController.add)
app.delete('/issues/:id', issueController.delete)
app.patch('/issues/:id', issueController.patch)
app.get('/issues', issueController.getAll)
app.get('/issues/:id', issueController.getOne)

// comment path
app.post('/issues/:issueId/comments', commentController.addComment)
app.delete(
  '/issues/:issueId/comments/:commentId',
  commentController.deleteComment
)
app.patch('/issues/:issueId/comments/:commentId', commentController.editComment)
app.patch(
  '/issues/:issueId/comments/:commentId/replies',
  commentController.editReply
)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
