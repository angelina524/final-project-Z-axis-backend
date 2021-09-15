const express = require('express')
const dotenv = require('dotenv')

const { errorHandler } = require('./middlewares/error')

const issueRouter = require('./routes/issueRouter')
const userRouter = require('./routes/userRouter')
const commentRouter = require('./routes/commentRouter')

const app = express()
const result = dotenv.config()
if (result.error) {
  throw result.error
}
const { PORT } = result.parsed
const port = PORT || 5001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routers
app.use('/users', userRouter)
app.use('/issues', issueRouter)
app.use('/issues/:issueId/comments', commentRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
