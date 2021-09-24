const crypto = require('crypto')
const dotenv = require('dotenv')

const result = dotenv.config()
if (result.error) {
  throw result.error
}
const {
  CRYPTO_ALGORITHM: algorithm,
  CRYPTO_KEY: key,
  CRYPTO_IV: iv
} = result.parsed

function encrypt (text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  cipher.update(text, 'utf8')
  return cipher.final('hex')
}

function decrypt (text) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  decipher.update(text, 'hex')
  return decipher.final('utf8')
}

module.exports = { encrypt, decrypt }
