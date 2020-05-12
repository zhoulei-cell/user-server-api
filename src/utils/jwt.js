const jwt = require("jsonwebtoken")
const { secret } = require("../config/jwt.config")

const sign = (data, params) => {
  params = params || {expiresIn: 60 * 60} //1小时后过期
  const token = jwt.sign(data, secret, params)
  return "Bearer " + token
}

const verify = (token) => {
  try {
    var decoded = jwt.verify(token, secret)
    return decoded
  } catch(err) {
    // err
    return false
  }
}

module.exports = {
  sign,
  verify
}