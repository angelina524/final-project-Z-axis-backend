const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const db = require('../models')
const { User } = db

const {
  GeneralError,
  NotFound,
  Unauthorized
} = require('./error')

const result = dotenv.config()
if (result.error) {
  throw result.error
}
const { JWT_SECRET_KEY } = result.parsed

const emailToJwtToken = (email) => {
  const payload = {
    email
  }
  return jwt.sign(payload, JWT_SECRET_KEY)
}

const JwtTokenToEmail = (token) => {
  const payload = jwt.verify(token, JWT_SECRET_KEY)
  if (!payload) throw new Unauthorized('請重新登入')
  return payload.email
}

const getUserId = async (token) => {
  const email = await JwtTokenToEmail(token)
  const user = await User.findOne({
    where: {
      email,
      isDeleted: 0
    }
  })
  if (!user) throw new NotFound('找不到使用者')
  return user.id
}

const CompareUserId = async (url, params, id) => {
  if (url.includes('issues') && !url.includes('comments')) {
    const issueId = params
    const issue = await Issue.findOne({
      where: {
        id: issueId,
        isDeleted: 0,
        userId: id
      }
    })
    return !!issue
  }

  // if (url.includes('comments')) {

  // }

}

const checkAuth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  if (!token.trim()) throw new GeneralError('請先登入')

  const id = await getUserId(token)
  res.locals.id = id

  const url = req.url
  const params = req.params
  return CompareUserId(url, params, id)
}

const checkLoginAuth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  if (!token.trim()) throw new GeneralError('請先登入')

  const id = await getUserId(token)
  res.locals.id = id

  return next()
}


module.exports = { emailToJwtToken, JwtTokenToEmail, getUserId, checkLoginAuth, checkAuth }
