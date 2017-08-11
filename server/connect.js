const mongoose = require('mongoose')

mongoose.Promise = Promise

const DATABASE = 'fullstack-starter-kit'

const isProd = process.env.NODE_ENV === 'production'

// connection or db
module.exports = function connect (env) {
  let database
  if (isProd) database = DATABASE
  else database = `${DATABASE}-${env || 'dev'}`
  const uri = `mongodb://localhost:27017/${database}`
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
