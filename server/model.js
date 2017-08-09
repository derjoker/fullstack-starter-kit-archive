const mongoose = require('mongoose')

const user = mongoose.Schema({
  name: String, email: String, age: Number
})

module.exports.user = user
module.exports.User = mongoose.model('User', user)
