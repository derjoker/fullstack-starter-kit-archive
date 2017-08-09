const { makeExecutableSchema } = require('graphql-tools')
const mongoose = require('mongoose')

const user = mongoose.Schema({
  name: String, email: String, age: Number
})

const User = mongoose.model('User', user)

const typeDefs = `
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}

type Query {
  test: String
  users (name: String!) : [User]
}

type Mutation {
  createUser (name: String!, email: String!, age: Int) : User
}
`

const resolvers = {
  Query: {
    test: () => 'it works!',
    users: (_, { name }) => User.find({ name: new RegExp(name) })
  },
  Mutation: {
    createUser: async (_, { name, email, age }) => {
      const user = new User({
        name, email, age
      })
      const doc = await user.save()
      console.log(doc)
      return doc
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
