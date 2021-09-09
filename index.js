const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
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
const { PORT, SECRET } = result.parsed
const port = PORT || 5001

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
  })
)

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
app.post('/issues/:id/comments', commentController.addComment)
app.delete('/comments/:id', commentController.deleteComment)
app.patch('/comments/:id', commentController.editComment)
app.get('/comments', commentController.getAllComments)
app.get('/comments/:id', commentController.getOneComment)
// reply path
app.patch('/comments/:id/replies', commentController.editReply)
app.get('/issues/:id/replies', commentController.getAllReplies)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
