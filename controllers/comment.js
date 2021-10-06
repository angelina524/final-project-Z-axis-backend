const db = require('../models')
const { Comment, Issue, GuestsCommentsRelation } = db
const { MissingError, GeneralError, NotFound } = require('../middlewares/error')

const commentController = {
  addComment: async (req, res) => {
    const nickname = req.body.nickname || 'Anonymous'
    const content = req.body.content
    const guestToken = req.headers['guest-token']
    const { issueId } = req.params
    if (!content) throw MissingError

    const comment = await Comment.create({
      nickname,
      content,
      IssueId: Number(issueId),
      guestToken
    })
    if (!comment) throw new GeneralError('新增留言失敗')

    res.status(200).json({
      ok: 1,
      message: '新增留言成功',
      comment,
      statusCode: 200
    })
  },

  deleteComment: async (req, res) => {
    const { commentId } = req.params

    const response = await Comment.destroy({
      where: {
        id: Number(commentId)
      }
    })
    if (!response) throw new GeneralError('刪除留言失敗')

    res.status(200).json({
      ok: 1,
      message: '刪除留言成功',
      statusCode: 200
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
    if (!comment[0]) throw new GeneralError('編輯留言失敗')
    const updateComment = await Comment.findOne({
      where: {
        id: Number(commentId)
      }
    })

    res.status(200).json({
      ok: 1,
      message: '編輯留言成功',
      statusCode: 200,
      comment: updateComment
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
    if (!response) throw new GeneralError('編輯回覆失敗')

    res.status(200).json({
      ok: 1,
      message: '編輯回覆成功',
      statusCode: 200
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
      comments,
      statusCode: 200
    })
  },
  likesComment: async (req, res) => {
    const userId = res.locals.id
    const guestToken = res.locals.guestToken
    const { commentId } = req.params

    const comment = await Comment.findOne({
      where: {
        id: Number(commentId)
      }
    })
    if (!comment) throw new NotFound('找不到此留言')

    const { likesNum } = comment

    const createData = async (data) => {
      if (data === 'userId') {
        GuestsCommentsRelation.create({
          UserId: Number(userId),
          guestToken,
          commentId
        })
      } else {
        GuestsCommentsRelation.create({
          UserId: null,
          guestToken,
          commentId
        })
      }
    }
    const deleteData = async (data) => {
      if (data === 'userId') {
        GuestsCommentsRelation.destroy({
          where: {
            userId,
            commentId
          }
        })
      } else {
        GuestsCommentsRelation.destroy({
          where: {
            guestToken,
            commentId
          }
        })
      }
    }
    const likesOrUnLikedComment = async (data) => {
      if (data === 'likes') {
        Comment.update(
          {
            likesNum: Number(likesNum) + 1
          },
          {
            where: {
              id: Number(commentId)
            }
          }
        )
      } else {
        Comment.update(
          {
            likesNum: Number(likesNum) - 1
          },
          {
            where: {
              id: Number(commentId)
            }
          }
        )
      }
    }

    if (userId) {
      const isLiked = await GuestsCommentsRelation.findOne({
        where: {
          userId,
          commentId
        }
      })
      if (!isLiked) {
        await createData('userId')
        await likesOrUnLikedComment('likes')

        res.status(200).json({
          ok: 1,
          message: '按讚成功',
          statusCode: 200
        })
      } else {
        await deleteData('userId')
        await likesOrUnLikedComment('unLiked')

        res.status(200).json({
          ok: 1,
          message: '收回按讚',
          statusCode: 200
        })
      }
    } else if (guestToken) {
      const isLiked = await GuestsCommentsRelation.findOne({
        where: {
          guestToken,
          commentId
        }
      })
      if (!isLiked) {
        await createData('guestToken')
        await likesOrUnLikedComment('likes')

        res.status(200).json({
          ok: 1,
          message: '按讚成功',
          statusCode: 200
        })
      } else {
        await deleteData('guestToken')
        await likesOrUnLikedComment('unLiked')

        res.status(200).json({
          ok: 1,
          message: '收回按讚',
          statusCode: 200
        })
      }
    }
  }
}

module.exports = commentController
