const mongoose = require('mongoose')

mongoose.Promise = Promise

const DATABASE = 'fullstack-starter-kit'

const isProd = process.env.NODE_ENV === 'production'
const database = DATABASE + (isProd ? '' : '-test')
const uri = `mongodb://localhost:27017/${database}`

// connection or db
module.exports = function connect () {
  mongoose.connect(uri, {
    useMongoClient: true
  })
  const connection = mongoose.connection
  connection.on('error', console.error.bind(console, 'connection error:'))
  connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${uri}`)
  })

  return connection
}
