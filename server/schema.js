const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
type Query {
  test: String
}
`

const resolvers = {
  Query: {
    test: () => 'it works!'
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
