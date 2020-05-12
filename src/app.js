const Koa = require("koa")
const app = new Koa()
const http = require("http")
const cors = require("koa2-cors")
const bodyParser = require("koa-bodyparser")
const koaJwt = require("koa-jwt")
const mongo = require("./connect/db.connect")
const apiAdminRouter = require("./routes/api/admin")
const apiUsersRouter = require("./routes/api/users")
const { secret } = require("./config/jwt.config")

mongo.connect()

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      //ctx.status = 401;
      ctx.body = {code: -1, status: 401, error: 'Protected resource, use Authorization header to get access\n'}
    } else {
      throw err;
    }
  });
})
app.use(cors())
app.use(koaJwt({secret})
   .unless({path: [/^\/api\/admin\/login/, /^\/api\/check\/token/]}))
app.use(bodyParser())
app.use(apiAdminRouter.routes(), apiAdminRouter.allowedMethods())
app.use(apiUsersRouter.routes(), apiUsersRouter.allowedMethods())

http.createServer(app.callback()).listen(3000, () => {
  console.log(`http server started on 3000`)
})
