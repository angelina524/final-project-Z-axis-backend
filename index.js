const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')

const userController = require('./controllers/user')
const issueController = require('./controllers/issue')
const commentController = require('./controllers/comment')

const app = express()
const port = process.env.PORT || 5001

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
)

function checkAdminPermission(req, res, next) {}

// user
app.post('/users/register', userController.register)
app.post('/users/login', userController.login)
app.get('/users/me', userController.getOneProfile)
app.patch('/users/me', userController.editProfile)

// user need admin permission
app.get('/users', checkAdminPermission, userController.getAllUsers)
app.get('/search', checkAdminPermission, userController.getOneUser)

// issue path
app.post('/issues', issueController.add)
app.delete('/issues/:id', issueController.delete)
app.patch('/issues/:id', issueController.patch)
app.get('/issues', issueController.getAll)
app.get('/issues/:id', issueController.getOne)

// comment path
app.post('/issue/:id/comments', commentController.addComment)
app.delete('/comments/:id', commentController.deleteComment)
app.patch('/comments/:id', commentController.editComment)
app.get('/comments', commentController.getAllComments)
app.get('/comments/:id', commentController.getOneComment)
// reply path
app.patch('/comments/:id/replies', commentController.editReply)
app.get('/issue/:id/replies', commentController.getAllReplies)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
