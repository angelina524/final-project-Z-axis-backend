const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

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

export { emailToJwtToken, JwtTokenToEmail }
