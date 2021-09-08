const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const dotenv = require('dotenv')

const { errorHandler } = require('./middlewares/error')
const userController = require('./controllers/user')
const issueController = require('./controllers/issue')

const app = express()
const result = dotenv.config()
if (result.error) {
  throw result.error
}
const { PORT, SECRET } = result.parsed
const port = PORT || 5001

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true
}))

const userController = require('./controllers/user')

app.use(errorHandler)

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
