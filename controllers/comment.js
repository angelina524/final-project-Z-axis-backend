const db = require('../models')
const { Issue_Guest_Comment: Comment } = db

const commentController = {
  addComment: async (req, res) => {
    const { nickname, content } = req.body
    const { id } = req.params
    // guestToken?
    const guestToken = 'testToken123'
    // todo: error handling
    const comment = await Comment.create({
      nickname,
      content,
      issueId: Number(id),
      guestToken,
    })
    res.send({ comment })
  },
  deleteComment: async (req, res) => {
    const { id } = req.params
    // todo: error handling
    await Comment.destroy({
      where: {
        id: Number(id),
      },
    })
    res.send('deleteComment')
  },
  editComment: async (req, res) => {
    const { nickname, content } = req.body
    const { id } = req.params
    // todo: error handling
    const response = await Comment.update(
      {
        nickname,
        content,
      },
      {
        where: {
          id: Number(id),
        },
      }
    )
    res.send({ response })
  },
  getAllComments: async (req, res) => {
    // todo: error handling
    const comments = await Comment.findAll()
    res.send({ comments })
  },
  getOneComment: async (req, res) => {
    const { id } = req.params
    // todo: error handling
    const comment = await Comment.findOne({
      where: {
        id: Number(id),
      },
    })
    res.send({ comment })
  },
  editReply: async (req, res) => {
    const { reply } = req.body
    const { id } = req.params
    // todo: error handling
    const response = await Comment.update(
      {
        reply,
        replyCreateAt: new Date(),
      },
      {
        where: {
          id: Number(id),
        },
      }
    )
    res.send({ response })
  },
  getAllReplies: async (req, res) => {
    const { id } = req.params
    // todo: error handling
    const replies = await Comment.findAll({
      where: {
        issueId: Number(id),
      },
      attributes: ['reply', 'replyCreateAt'],
    })
    res.send({ replies })
  },
}

module.exports = commentController
