/* eslint-env jest */
import { flatten, keys, uniq } from 'lodash'

import connect from './connect'
import { user } from './model'

const db = connect()

describe('model/User', () => {
  beforeAll(async () => {
    await db.dropDatabase()
  })

  it('save', async () => {
    const User = db.model('User', user, 'users-save')
    const model = new User({
      name: 'test', email: 'test', age: 5
    })
    const created = await model.save()
    const found = await User.findById(model._id)
    expect(created.toJSON()).toEqual(found.toJSON())
  })

  it('unique compound indexes', async () => {
    const User = db.model('User', user, 'users-index')

    const indexes = User.schema.indexes()
    // index = [field, option, ...]
    const uniqueFields = indexes.filter(index => index[1].unique)
    const indexedFields = flatten(uniqueFields.map(index => keys(index[0])))
    const indexedUniqueFields = uniq(indexedFields)

    expect(indexedUniqueFields).toEqual(['name', 'email'])
  })

  it('duplicate key error', () => {
    const User = db.model('User', user, 'users-duplicate')
    // schema.index() doesn't work!
    User.collection.createIndex({name: 1, email: 1}, {unique: true})

    User.create([
      {name: 'test', email: 'test', age: 5},
      {name: 'test', email: 'test', age: 5}
    ], (error) => {
      // MongoError: E11000 duplicate key error
      expect(error.code).toBe(11000)
    })
  })

  it('validate', () => {})

  it('upsert', () => {})

  it('upsert (overwrite)', () => {})

  it('update', () => {})

  it('delete', () => {})
})
