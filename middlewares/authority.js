const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const db = require('../models')
const { User, Issue, Comment, Guest } = db

const { GeneralError, NotFound, Unauthorized } = require('./error')

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

// checkUser
const getUserId = async (req) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  if (!token.trim()) throw new GeneralError('請先登入')

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

const compareUserId = async (req, id) => {
  if (req.url.includes('issues')) {
    const issueId = req.params
    const issue = await Issue.findOne({
      where: {
        id: issueId,
        isDeleted: 0,
        userId: id
      }
    })
    return !!issue
  }
}

const checkUserAuth = async (req, res, next) => {
  const id = await getUserId(req)
  res.locals.id = id

  if (compareUserId(req, id)) {
    return next()
  } else {
    throw new Unauthorized('未通過權限驗證，請確認權限')
  }
}

const checkLoginAuth = async (req, res, next) => {
  const id = await getUserId(req)
  res.locals.id = id

  return next()
}

// checkGuest
const getGuestToken = async (req) => {
  const token = req.headers['guest-token']
  if (!token.trim()) throw new GeneralError('確認訪客失敗，請重新載入網頁')

  const guest = await Guest.findOne({
    where: {
      guestToken: token
    }
  })
  if (!guest) throw new NotFound('找不到訪客資訊')
  return guest.guestToken
}

const compareGuestToken = async (req) => {
  const guestToken = getGuestToken(req)
  const commentId = req.params
  const guest = await Comment.findOne({
    where: {
      id: commentId,
      guestToken
    }
  })
  return !!guest
}

const checkGuestAuth = async (req, res, next) => {
  if (compareGuestToken(req)) {
    return next()
  } else {
    throw new Unauthorized('未通過權限驗證，請確認權限')
  }
}

const checkGuestToken = (req, res, next) => {
  if (getGuestToken(req)) {
    return next()
  } else {
    throw new Unauthorized('請重新載入網頁')
  }
}

// checkUser || checkGuest
const checkGuestOrUserAuth = (req, res, next) => {
  if (compareGuestToken(req) || compareUserId(req, getUserId(req))) {
    return next()
  } else {
    throw new Unauthorized('未通過權限驗證，請確認權限')
  }
}

module.exports = {
  emailToJwtToken,
  checkLoginAuth,
  checkUserAuth,
  checkGuestToken,
  checkGuestAuth,
  checkGuestOrUserAuth
}
