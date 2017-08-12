const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const next = require('next')

const connect = require('./connect')
connect()

const schema = require('./schema')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = dev ? 3000 : 9000

app.prepare()
  .then(() => {
    const server = express()

    server.use(express.static('public'))

    server.use('/graphql', bodyParser.json(), graphqlExpress({
      schema
    }))

    server.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }))

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
