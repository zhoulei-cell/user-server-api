const Router = require("@koa/router")
const router = new Router({
  prefix: "/api"
})
const User = require("../../model/users")
const { hash } = require("../../utils/bcrypt")
const { State, UserInfo } = require("../../utils/models")

router.get("/users/:num/:size", async ctx => {
  const users = []
  const condition = ctx.query
  const { num, size } = ctx.params
  const total = await User.find(condition).countDocuments()
  const result = await User.find(condition).skip((num - 1) * size).limit(Number(size))
  result.forEach(item => {
    users.push(new UserInfo(item))
  })
  ctx.body = {code: 0, status: 200, users, total}
})

router.post("/users/add", async ctx => {
  const { username, password, email, age, sex } = ctx.request.body
  const pwd = await hash(password)
  const user = new User({
    username,
    password: pwd,
    email,
    age,
    sex
  })
  try {
    const result = await user.save()
    ctx.body = {code: 0, status: 200, user: new UserInfo(result)}
  } 
  catch(e) {
    ctx.body = new State({code: -1, status: 401})
  }
  
})

router.post("/users/update", async ctx => {
  const { _id, username, email, age, sex, disabled } = ctx.request.body
  try {
    const result = await User.findOneAndUpdate({_id}, {$set: { username, email, age, sex, disabled }})
    ctx.body = new State({code: 0, status: 200, data: new UserInfo(result)})
  }
  catch(e) {
    ctx.body = new State({code: -1, status: 401})
  }
  
})

router.post("/users/delete", async ctx => {
  const { _id } = ctx.request.body
  try {
    const result = await User.findByIdAndDelete({ _id })
    ctx.body = new State({code: 0, status: 200, data: new UserInfo(result)})
  } 
  catch(e) {
    ctx.body = new State({code: -1, status: 401})
  }
})

/*router.put("/users", async ctx => {
  ctx.body = "更新用户信息"
})*/

/*router.delete("/users", async ctx => {
  ctx.body = "删除用户信息"
})*/

module.exports = router