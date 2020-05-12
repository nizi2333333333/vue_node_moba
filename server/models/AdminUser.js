const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    // select: false,// 加了后，密码是查不出来的
    set(val) {
      return require('bcryptjs').hashSync(val, 4)
    }
  }
})


module.exports = mongoose.model('AdminUser', schema)