const express = require('express')

const app = express()

// 跨域
app.use(require('cors')())
// 让express可以解析json数据
app.use(express.json())
// 把app传到数据库
require('./plugins/db')(app)
// 让admin里的index.js 里写的路由，可以获取到app
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('3000 端口已启动')
})