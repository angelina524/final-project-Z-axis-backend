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
  const token = req.headers.authorization.replace('Bearer ', '')
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

const compareUserId = async (params, id) => {
  const { issueId } = params
  const issue = await Issue.findOne({
    where: {
      id: issueId,
      isDeleted: 0,
      userId: id
    }
  })
  return !!issue
}

const checkUserAuth = async (req, res, next) => {
  const id = await getUserId(req)
  res.locals.id = id

  const isUserMatched = await compareUserId(req.params, id)
  if (!isUserMatched) {
    throw new Unauthorized('未通過權限驗證，請確認權限')
  }
  return next()
}

const checkLoginAuth = async (req, res, next) => {
  const id = await getUserId(req)
  res.locals.id = id

  return next()
}

// checkGuest
const getGuestToken = async (headers) => {
  const token = headers['guest-token']
  if (!token.trim()) throw new GeneralError('確認訪客失敗，請重新載入網頁')

  const guest = await Guest.findOne({
    where: {
      guestToken: token
    }
  })
  if (!guest) throw new NotFound('找不到訪客資訊')
  return guest.guestToken
}

const compareGuestToken = async (guestToken, params) => {
  const { commentId } = params
  const guest = await Comment.findOne({
    where: {
      id: commentId,
      guestToken
    }
  })
  return !!guest
}

const checkGuestAuth = async (req, res, next) => {
  const guestToken = await getGuestToken(req.headers)
  if (!guestToken) throw new GeneralError('請重新載入網頁')
  const isGuestMatched = await compareGuestToken(guestToken, req.params)
  if (!isGuestMatched) {
    throw new Unauthorized('未通過權限驗證，請確認權限')
  }
  return next()
}

const checkGuestToken = async (req, res, next) => {
  const guestToken = await getGuestToken(req.headers)
  if (!guestToken) throw new GeneralError('請重新載入網頁')
  return next()
}

// checkUser || checkGuest
const checkGuestOrUserAuth = async (req, res, next) => {
  let userToken = null
  let guestToken = null
  if (req.headers.authorization) {
    userToken = req.headers.authorization.replace('Bearer', '').trim()
  }
  if (req.headers['guest-token']) {
    guestToken = req.headers['guest-token']
  }
  if (userToken) {
    const id = await getUserId(req)
    const isUserMatched = await compareUserId(req.params, id)
    if (isUserMatched) return next()
  }
  if (guestToken) {
    const isGuestMatched = await compareGuestToken(guestToken, req.params)
    if (isGuestMatched) return next()
  }
  throw new Unauthorized('未通過權限驗證，請確認權限')
}

const checkGuestTokenOrUserId = async (req, res, next) => {
  let userToken = null
  let guestToken = null

  if (req.headers.authorization) {
    userToken = req.headers.authorization.replace('Bearer', '').trim()
  }
  if (req.headers['guest-token']) {
    guestToken = req.headers['guest-token']
  }
  if (userToken) {
    const hasUser = await User.findOne({
      where: {
        userToken,
        isDeleted: 0
      }
    })
    if (hasUser) {
      res.locals.id = hasUser.id
      return next()
    }
  }
  if (guestToken) {
    const hasGuest = await Guest.findOne({
      where: {
        guestToken
      }
    })
    if (hasGuest) {
      res.locals.guestToken = hasGuest.guestToken
      return next()
    }
  }
  throw new Unauthorized('未通過權限驗證，請確認權限')
}

module.exports = {
  emailToJwtToken,
  checkLoginAuth,
  checkUserAuth,
  checkGuestToken,
  checkGuestAuth,
  checkGuestOrUserAuth,
  checkGuestTokenOrUserId
}
