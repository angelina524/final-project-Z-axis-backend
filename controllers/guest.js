const db = require('../models')
const { Guest } = db

const generateRandomString = (num) => {
  const result = Math.random()
    .toString(36)
    .substring(2, num + 2)
  return result
}

const guestController = {
  createGuest: async (req, res) => {
    const guestToken = generateRandomString(8)

    const guest = await Guest.create({
      guestToken
    })
    if (!guest) throw new GeneralError('新增 guest 失敗！')

    res.status(200).json({
      ok: 1,
      message: '新增 guest 成功！',
      guest
    })
  }
}

module.exports = guestController
