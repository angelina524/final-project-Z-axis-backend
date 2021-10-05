const db = require('../models')
const { Issue, Comment } = db
const {
  MissingError,
  GeneralError,
  NotFound,
  BadRequest
} = require('../middlewares/error')
const { encrypt, decrypt } = require('../utils/crypto')

const validateDate = (date) => {
  const dateRegex = /^[0-9]{4}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/
  return dateRegex.test(date)
}

const validateDateRange = (beginDate, finishDate) => {
  if (!finishDate) return false
  const dateRange =
    (new Date(finishDate) - new Date(beginDate)) / (86400 * 1000)
  return dateRange <= 5 && dateRange >= 0
}

const resetFinishDate = (date) => {
  const finishDate = new Date(new Date(date).getTime() + 5 * 86400 * 1000)
  return finishDate.toISOString().substring(0, 10)
}

const issueController = {
  add: async (req, res) => {
    const userId = res.locals.id
    const { title, description, beginDate, finishDate } = req.body
    if (!title || !beginDate) throw MissingError
    if (!validateDate(beginDate) || (finishDate && !validateDate(finishDate))) {
      throw new BadRequest('合法日期格式為 YYYY-MM-DD')
    }
    const validatedFinishDate = validateDateRange(beginDate, finishDate)
      ? finishDate
      : resetFinishDate(beginDate)

    const issue = await Issue.create({
      title,
      description,
      beginDate,
      finishDate: validatedFinishDate,
      UserId: Number(userId)
    })
    if (!issue) throw new GeneralError('新增失敗')
    // encrypt: issueId => issueURL
    const issueId = issue.id.toString()
    const encoded = encrypt(issueId)

    res.status(200).json({
      ok: 1,
      message: '新增成功',
      url: encoded,
      issue,
      statusCode: 200
    })
  },

  delete: async (req, res) => {
    const userId = res.locals.id
    const { issueId } = req.params
    const deletedResult = await Issue.update(
      {
        isDeleted: 1
      },
      {
        where: {
          UserId: userId,
          id: Number(issueId),
          isDeleted: 0
        }
      }
    )
    if (!deletedResult[0]) throw new GeneralError('刪除失敗，請再試一次')
    res.status(200).json({
      ok: 1,
      message: '刪除成功',
      statusCode: 200
    })
  },

  patch: async (req, res) => {
    const userId = res.locals.id
    const { issueId } = req.params
    const { title, description, beginDate, finishDate } = req.body
    if (!title || !beginDate) throw MissingError
    if (!validateDate(beginDate) || (finishDate && !validateDate(finishDate))) {
      throw new BadRequest('合法日期格式為 YYYY-MM-DD')
    }
    const validatedFinishDate = validateDateRange(beginDate, finishDate)
      ? finishDate
      : resetFinishDate(beginDate)
    const updatedResult = await Issue.update(
      {
        title,
        description,
        beginDate,
        finishDate: validatedFinishDate
      },
      {
        where: {
          UserId: userId,
          id: Number(issueId),
          isDeleted: 0
        }
      }
    )
    if (!updatedResult[0]) throw new GeneralError('更新失敗，請再試一次')
    res.status(200).json({
      ok: 1,
      message: '更新成功',
      statusCode: 200
    })
  },

  getAll: async (req, res) => {
    const { limit } = req.query
    if (/\D/.test(limit)) throw new BadRequest('limit 必須是正整數')
    const userId = res.locals.id
    const issues = await Issue.findAll({
      where: {
        userId,
        isDeleted: 0
      },
      limit: Number(limit),
      include: Comment
    })

    const issuesWithURL = issues.map((issue) => {
      const url = encrypt(issue.id.toString())
      const commentCount = issue.Comments.length
      return { issue, url, commentCount }
    })

    res.status(200).json({
      ok: 1,
      issuesWithURL,
      statusCode: 200
    })
  },

  getOne: async (req, res) => {
    const { issueURL } = req.params
    const issueId = decrypt(issueURL)
    const issue = await Issue.findOne({
      where: {
        id: Number(issueId),
        isDeleted: 0
      }
    })
    if (!issue) throw new NotFound('找不到這個提問箱')
    res.status(200).json({
      ok: 1,
      issue,
      statusCode: 200
    })
  },
  pinCommentOnTop: async (req, res) => {
    const { issueId } = req.params
    const { commentId } = req.body

    const comment = await Comment.findOne({
      where: {
        id: Number(commentId),
        IssueId: Number(issueId)
      }
    })
    if (!comment) throw new NotFound('找不到此留言')

    await Issue.update(
      {
        topCommentId: comment.id
      },
      {
        where: {
          id: Number(issueId),
          isDeleted: 0
        }
      }
    )

    res.status(200).json({
      ok: 1,
      message: '置頂成功',
      comment
    })
  },
  unpinCommentOnTop: async (req, res) => {
    const { issueId } = req.params

    await Issue.update(
      {
        topCommentId: 0
      },
      {
        where: {
          id: Number(issueId),
          isDeleted: 0
        }
      }
    )
    res.status(200).json({
      ok: 1,
      message: '取消置頂成功'
    })
  }
}

module.exports = issueController
