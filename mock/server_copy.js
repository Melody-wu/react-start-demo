const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log(`请求的URL${ctx.request.url}`)
  await next()
})
// 使用路由处理get请求
router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>index</h1>
  <form action="/sign" method="post">
  <p>Name: <input name="name"></p>
  <p>Password: <input name="password" type="password"></p>
  <p><input type="submit" value="Submit"></p>
  </form>
  `
})

router.post('/sign', async (ctx, next) => {
  var name = ctx.request.body.name || ``
  var password = ctx.request.body.password || ``
  console.log(`用户${name}请求登录,密码是${password}`)
  if (name === `zhaotong` && password === `1994`) {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
    <p><a href="/">Try again</a></p>`
  }
})

// 进行requestbody解析
app.use(bodyParser())
// 加入路由
app.use(router.routes())

app.listen(3000)

console.log(`服务器已经启动`)

作者：赵仝
链接：https://www.jianshu.com/p/c70223acd83c
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。