const { makeExecutableSchema } = require('graphql-tools')

const { User } = require('./model')

const typeDefs = `
type User {
  id: ID!
  name: String!
  email: String!
  address: String
  age: Int
}

type Query {
  test: String
  users (name: String!) : [User]
}

type Mutation {
  createUser (name: String!, email: String!, address: String, age: Int) : User
}
`

const resolvers = {
  Query: {
    test: () => 'it works!',
    users: (_, { name }) => User.find({ name: new RegExp(name) })
  },
  Mutation: {
    createUser: async (_, { name, email, address, age }) => {
      const user = await User.insert({
        name, email, address, age
      })
      return user
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
