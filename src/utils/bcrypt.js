const bcrypt = require("bcryptjs")
const saltRounds = 10;

const hash = async (val) => {
  try {
    const hash = await bcrypt.hash(val, saltRounds)
    return hash
  }
  catch (e) {
    throw new Error(e)
  }
}

const compare = async (password, hash) => {
  try {
    const bool = await bcrypt.compare(password, hash)
    return bool
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
  hash,
  compare
}