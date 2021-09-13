const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const db = require('../models')
const { User } = db

const {
  GeneralError,
  VerifyError
} = require('../error')

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
  if (!payload.email) return false
  return payload.email
}

const getUserId = async (res) => {
  const token = res.locals.token
  if (!token) return GeneralError('請先登入')
  const email = await JwtTokenToEmail(token)
  const user = await User.findOne({
    where: {
      email,
      isDeleted: 0
    }
  })
  if (!user) throw VerifyError
  return user.id
}

module.exports = { emailToJwtToken, JwtTokenToEmail, getUserId }
