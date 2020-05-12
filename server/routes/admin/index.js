module.exports = app => {

  const express = require('express')
  const router = express.Router()
  const assert = require('http-assert')

  const jwt = require('jsonwebtoken')
  const SECRET = app.get('secret')
  const AdminUser = require("../../models/AdminUser")

  const auth = async (req, res, next) => {
    // console.log(req.headers.authorization)
    const token = (req.headers.authorization || "").split(' ')[1]
    assert(token, 401, "请先登录")
    const {id} = jwt.verify(token,SECRET)
    assert(id, 401, "请先登录")
    const user = await AdminUser.findById(id)
    assert(user, 401, "请先登录")
    req.user = user
    await next()
  }

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    // else if(req.Model.modelName === 'Article'){
    //   queryOptions.populate = 'categories'
    // }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  router.get('/:id', async (req, res) => {
    const item = await req.Model.findById(req.params.id)
    res.send(item)
  })

  router.put('/:id', async (req, res) => {
    const item = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(item)
  })

  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  // 动态路由——通用CRUD
  app.use('/admin/api/rest/:resource', auth, async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  // 图片上传
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + './../../uploads'
  })
  //,upload.single('file')
  app.use('/admin/api/upload', auth, upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.use('/admin/api/login', async (req, res) => {
    const {
      username,
      password
    } = req.body
    // 1. 根据用户名找用户
    // const AdminUser = require("../../models/AdminUser")
    const user = await AdminUser.findOne({
      username
    })
    // if (!user) {
    //   return res.status(422).send({
    //     message: "用户名不存在"
    //   })
    // }
    assert(user, 422, '用户名不存在')
    // 2. 校验密码
    console.log(user.password)
    const isPasswordValid = require('bcryptjs').compareSync(password, user.password)
    // if (!isPasswordValid) {
    //   return res.status(422).send({
    //     message: '密码无效'
    //   })
    // }
    assert(isPasswordValid, 422, '密码无效')
    // 3. 返回token
    // const jwt = require('jsonwebtoken')
    // const SECRET = app.get('secret')
    const token = jwt.sign({
      id: user._id
    }, SECRET)
    console.log(user)
    res.send({
      user,
      token
    })
  })

  // 错误处理
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}