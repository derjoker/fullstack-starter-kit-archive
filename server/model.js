const mongoose = require('mongoose')

const user = mongoose.Schema({
  name: String, email: String, age: Number
})

user.index({
  name: 1, email: 1
}, { unique: true })

module.exports.user = user
module.exports.User = mongoose.model('User', user)
