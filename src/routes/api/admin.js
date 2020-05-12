const Router = require("@koa/router")
const router = new Router({
  prefix: "/api"
})
const Admin = require("../../model/admin")
const jwt = require("../../utils/jwt")
const { hash, compare } = require("../../utils/bcrypt")
const resolveAuthorizationHeader = require("../../utils/auth-header")

router.get("/admin/login", async ctx => {
  const { username, password } = ctx.query
  const info = await Admin.findOne({username})
  if (info) {
    const data = {_id: info._id, username: info.username}
    const token = jwt.sign(data)
    const checkPwd = await compare(password, info.password)
    ctx.body = checkPwd ? {code: 0, status: 200, token, data} : {code: -1, status: 401}
  } else {
    ctx.body = {code: -1, status: 400}
  }
})

router.post("/admin/add", async ctx => {
  const { username, password } = ctx.request.body
  ctx.body = {username, password}
  const pwd = await hash(password)
  Admin.create({username, password: pwd}).then(res => {
    console.log(res)
  })
})

router.get("/check/token", async ctx => {
  const token = resolveAuthorizationHeader(ctx)
  const decoded = jwt.verify(token)
  if (token) {
    ctx.body = {code: 0, status: 200, isValid: decoded}
  } else {
    ctx.body = {code: -1, status: 401}
  }
})

module.exports = router