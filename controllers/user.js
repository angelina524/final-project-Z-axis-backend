const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const db = require('../models')
const {
  MissingError,
  GeneralError,
  VerifyError,
  NotFound
} = require('../middlewares/error')
const { emailToJwtToken, JwtTokenToEmail } = require('../middlewares/authority')

const result = dotenv.config()
if (result.error) {
  throw result.error
}
const { SALTROUNDS } = result.parsed

const { User } = db

const isEmailFormatValid = (email) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return regex.test(email)
}

const isPasswordFormatValid = (email) => {
  const regex = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z]).*$/
  return regex.test(email)
}

const userController = {
  register: async (req, res) => {
    const { nickname, email, password } = req.body
    if (!nickname || !email || !password) throw MissingError
    if (!isEmailFormatValid(email)) throw new GeneralError('信箱格式錯誤')
    if (!isPasswordFormatValid(password)) {
      throw new GeneralError(
        '密碼格式錯誤，長度需為 8 以上並包含小寫英文字母、數字'
      )
    }
    const hash = await bcrypt.hash(password, SALTROUNDS)
    const token = await emailToJwtToken(email)
    await User.create({
      nickname,
      email,
      password: hash,
      token
    })

    return res.status(200).json({
      ok: 1,
      token
    })
  },
  login: async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) throw MissingError
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) throw VerifyError
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw VerifyError

    return res.status(200).json({
      ok: 1,
      token: user.token
    })
  },
  getOneProfile: async (req, res) => {
    const token = req.locals.token
    const user = await User.findOne({
      where: {
        email: JwtTokenToEmail(token)
      }
    })
    if (!user) throw new NotFound('找不到使用者')

    return res.status(200).json({
      ok: 1,
      user
    })
  },
  editProfile: async (req, res) => {
    const token = req.locals.token
    const user = await User.findOne({
      where: {
        email: JwtTokenToEmail(token)
      }
    })
    if (!user) throw new NotFound('找不到使用者')
    const nickname = req.body.nickname || user.nickname
    const email = req.body.email || user.email
    if (!nickname || !email) throw MissingError
    if (!isEmailFormatValid(email)) throw new GeneralError('信箱格式錯誤')
    const updatedResult = await User.update({
      nickname,
      email
    })
    if (!updatedResult[0]) throw new GeneralError('更新失敗，請再試一次')

    return res.status(200).json({
      ok: 1,
      message: '個人資訊更新成功'
    })
  },
  updatePassword: async (req, res) => {
    const { oldPassword, newPassword, againPassword } = req.body
    if (!oldPassword || !newPassword || !againPassword) throw MissingError
    const token = req.locals.token
    const email = JwtTokenToEmail(token)
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) throw new NotFound('找不到使用者')
    const passwordIsValid = await bcrypt.compare(oldPassword, user.password)
    if (!passwordIsValid) throw VerifyError
    if (!isPasswordFormatValid(newPassword)) { throw new GeneralError('密碼格式錯誤，需包含英文、數字') }
    if (newPassword !== againPassword) { throw new GeneralError('兩次密碼輸入不一致') }
    const hash = await bcrypt.hash(newPassword, SALTROUNDS)
    const updatedResult = await User.update(
      { password: hash },
      { where: { email } }
    )
    if (!updatedResult[0]) throw new GeneralError('更新失敗，請再試一次')

    return res.status(200).json({
      ok: 1,
      message: '密碼更新成功'
    })
  }
}

module.exports = userController
