const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()

// socket.io config
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'UPDATE', 'DELETE']
  }
})

const { errorHandler } = require('./middlewares/error')

const issueRouter = require('./routes/issueRouter')
const userRouter = require('./routes/userRouter')
const commentRouter = require('./routes/commentRouter')
const guestRouter = require('./routes/guestRouter')
const relationRouter = require('./routes/relationRouter')

const result = dotenv.config()
if (result.error) {
  throw result.error
}
const { PORT } = result.parsed
const port = PORT || 5001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// routers
app.use('/users', userRouter)
app.use('/issues', issueRouter)
app.use('/issues/:issueId/comments', commentRouter)
app.use('/guest', guestRouter)
app.use('/relation', relationRouter)

app.use(errorHandler)

// socket.io
io.on('connection', (socket) => {
  socket.on('joinIssue', (issueId) => {
    socket.join(issueId)
  })
  socket.on('addComment', (comment) => {
    socket.to(comment.IssueId).emit('addComment', comment)
  })
  socket.on('updateComment', (comment) => {
    socket.to(comment.IssueId).emit('updateComment', comment)
  })
  socket.on('deleteComment', ({ IssueId, id }) => {
    socket.to(IssueId).emit('deleteComment', id)
  })
})

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
