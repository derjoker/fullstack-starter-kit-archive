const mongoose = require('mongoose')

const connect = require('./connect')
const Factory = require('./factory')

const db = connect()

const user = mongoose.Schema({
  name: {type: String, trim: true},
  email: String,
  address: {type: String, trim: true},
  age: Number
})

module.exports.user = user
module.exports.User = Factory(db, 'User', user, ['name', 'email'])
