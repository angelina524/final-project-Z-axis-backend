const db = require('../models')
const { Issue, User } = db
const {
  MissingError,
  GeneralError,
  VerifyError,
  NotFound
} = require('../middlewares/error')
const { JwtTokenToEmail } = require('../middlewares/authority')

const issueController = {
  // utils method ----------------------
  getUserId: async (req) => {
    const token = req.locals.token
    if (!token) return GeneralError('請先登入')
    const email = await JwtTokenToEmail(token)
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) throw VerifyError
    return user.id
  },

  // router method ------------------
  add: async (req, res) => {
    const userId = await this.getUserId(req)
    const { title, description, beginTime, finishTime } = req.body
    // description allow null value
    if (!title || !beginTime || !finishTime) throw MissingError
    const issue = await Issue.create({
      title,
      description,
      beginTime,
      finishTime,
      userId
    })
    if (!issue) throw new GeneralError('新增失敗')
    res.status(200).json({ ok: 1, message: '新增成功', issue })
  },

  delete: async (req, res) => {
    const userId = await this.getUserId(req)
    const { id } = req.params
    await Issue.update(
      {
        isDelete: 1
      },
      {
        where: {
          id: Number(id),
          userId: Number(userId)
        }
      }
    )
    res.status(200).json({
      ok: 1,
      message: '刪除成功'
    })
  },

  patch: async (req, res) => {
    const userId = await this.getUserId(req)
    const { title, description, beginTime, finishTime } = req.body
    // description allow null value
    if (!title || !beginTime || !finishTime) throw MissingError
    const { id } = res.params
    const response = await Issue.update(
      {
        title,
        description,
        beginTime,
        finishTime
      },
      {
        where: {
          id: Number(id),
          userId: Number(userId)
        }
      }
    )
    if (!response) throw new GeneralError('更新失敗')
    res.status(200).json({
      ok: 1,
      message: '更新成功',
      response
    })
  },

  getAll: async (req, res) => {
    const userId = await this.getUserId(req)
    const issues = await Issue.findAll({
      where: {
        userId: Number(userId)
      }
    })
    if (!issues) throw new NotFound('找不到題問')
    res.status(200).json({
      ok: 1,
      issues
    })
  },

  getOne: async (req, res) => {
    const userId = await this.getUserId(req)
    const { id } = req.params
    const issue = await Issue.findOne({
      where: {
        id: Number(id),
        userId: Number(userId)
      }
    })
    if (!issue) throw new NotFound('找不到題問')
    res.status(200).json({ ok: 1, issue })
  }
}

module.exports = issueController
