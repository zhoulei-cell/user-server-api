
class UserInfo {
  constructor(data) {
    this._id = data._id
    this.username = data.username
    this.email = data.email
    this.age = data.age
    this.sex = data.sex
    this.date = data.date
    this.disabled = data.disabled
  }
}

class State {
  constructor(data) {
    this.code = data.code
    this.status = data.status
    if (data.data) {
      this.data = data.data
    }
    if (data.token) {
      this.token = data.token
    }
  }
}

module.exports = {
  UserInfo,
  State
}