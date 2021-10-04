const { UniqueConstraintError } = require('sequelize')

class GeneralError extends Error {
  constructor (message) {
    super()
    this.message = message
  }

  getStatus () {
    if (this instanceof BadRequest) return 400
    if (this instanceof Unauthorized) return 401
    if (this instanceof NotFound) return 404
    return 500
  }
}

class BadRequest extends GeneralError {}
class Unauthorized extends GeneralError {}
class NotFound extends GeneralError {}

const MissingError = new BadRequest('資料輸入不齊全，請輸入完整資料')
const VerifyError = new Unauthorized('驗證失敗，請重新登入')

const errorHandler = (error, req, res, next) => {
  if (error instanceof UniqueConstraintError) {
    return res.status(200).json({
      ok: 0,
      message: error.original.sqlMessage,
      statusCode: 409
    })
  }

  if (error instanceof GeneralError) {
    return res.status(200).json({
      ok: 0,
      message: error.message,
      statusCode: error.getStatus()
    })
  }

  return res.status(200).json({
    ok: 0,
    message: error.message,
    statusCode: 500
  })
}

const catchAsyncError = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next)
}

module.exports = {
  GeneralError,
  MissingError,
  VerifyError,
  BadRequest,
  Unauthorized,
  NotFound,
  errorHandler,
  catchAsyncError
}
