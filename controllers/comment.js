const db = require('../models')
const { Comment, Issue } = db
const { MissingError, GeneralError, NotFound } = require('../middlewares/error')

const commentController = {
  addComment: async (req, res) => {
    const { nickname = 'Anonymous', content } = req.body
    const { issueId } = req.params
    if (!content) throw MissingError

    // guestToken?
    const guestToken = 'testToken123'

    const comment = await Comment.create({
      nickname,
      content,
      IssueId: Number(issueId),
      guestToken
    })
    if (!comment) throw GeneralError('新增留言失敗！')

    res.status(200).json({
      ok: 1,
      message: '新增留言成功！',
      comment
    })
  },
  deleteComment: async (req, res) => {
    const { commentId } = req.params

    const response = await Comment.destroy({
      where: {
        id: Number(commentId)
      }
    })
    if (!response) throw new GeneralError('刪除留言失敗！')

    res.status(200).json({
      ok: 1,
      message: '刪除留言成功！'
    })
  },
  editComment: async (req, res) => {
    const { nickname, content } = req.body
    const { commentId } = req.params
    if (!content) throw MissingError

    const comment = await Comment.update(
      {
        nickname,
        content
      },
      {
        where: {
          id: Number(commentId)
        }
      }
    )
    if (!comment[0]) throw new GeneralError('編輯留言失敗！')

    res.status(200).json({
      ok: 1,
      message: '編輯留言成功！'
    })
  },
  editReply: async (req, res) => {
    const { reply } = req.body
    const { commentId } = req.params

    const response = await Comment.update(
      {
        reply,
        replyCreateAt: new Date()
      },
      {
        where: {
          id: Number(commentId)
        }
      }
    )
    if (!response) throw new GeneralError('編輯回覆失敗！')

    res.status(200).json({
      ok: 1,
      message: '編輯回覆成功！'
    })
  },
  getAllComments: async (req, res) => {
    const { issueId } = req.params

    const issue = await Issue.findOne({
      where: {
        id: Number(issueId)
      }
    })

    if (!issue) throw new NotFound('找不到提問箱')

    const comments = await Comment.findAll({
      where: {
        IssueId: Number(issueId)
      }
    })

    res.status(200).json({
      ok: 1,
      comments
    })
  }
}

module.exports = commentController
