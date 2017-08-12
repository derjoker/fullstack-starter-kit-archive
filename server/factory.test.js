/* eslint-env jest */
import mongoose from 'mongoose'

import connect from './connect'
import Factory from './factory'

const db = connect('factory')

const user = mongoose.Schema({
  name: {type: String, trim: true},
  email: String,
  address: {type: String, trim: true},
  age: Number
})

const User = Factory(db, 'Factory-User', user, ['name', 'email'])

describe('Model Factory', () => {
  beforeAll(async () => {
    await db.dropDatabase()
  })

  it('playground', async () => {})

  it('insert doc', async () => {
    const user = await User.insert({
      name: ' insert doc ', email: 'email', age: 7
    })
    expect(user._id).toBeDefined()
    expect(user.name).toBe('insert doc')
    expect(user.email).toBe('email')
    expect(user.age).toBe(7)
  })

  it('insert doc (keep defaults)', async () => {
    const doc = {
      name: 'insert doc: keep defaults', email: 'email', age: 7
    }
    const user1 = await User.insert(doc)
    expect(user1.age).toBe(7)
    const user2 = await User.insert({
      ...doc, age: 27
    })
    expect(user2.age).toBe(7)
  })

  it('insert docs', async () => {
    const users = await User.insert([
      {name: 'insert docs (1)', email: 'email'},
      {name: 'insert docs (2)', email: 'email'}
    ])
    expect(Array.isArray(users)).toBeTruthy()
    expect(users[0]._id).toBeDefined()
    expect(users[1]._id).toBeDefined()
  })

  it('insert docs (same)', async () => {
    const users = await User.insert([
      {name: 'insert docs (same)', email: 'email'},
      {name: 'insert docs (same)', email: 'email'}
    ])
    expect(Array.isArray(users)).toBeTruthy()
    expect(users[0]._id).toEqual(users[1]._id)
  })

  it('insert docs (same, keep defaults)', async () => {
    const users = await User.insert([
      {name: 'insert docs (same, keep defaults)', email: 'email', age: 7},
      {name: 'insert docs (same, keep defaults)', email: 'email', age: 27}
    ])
    expect(users[0]._id).toEqual(users[1]._id)
    expect(users[1].age).toBe(7)
  })

  it('update', async () => {
    const doc = {
      name: 'update', email: 'email', age: 7
    }
    const user1 = await User.insert(doc)
    expect(user1.age).toBe(7)
    const user2 = await User.update({
      ...user1.toJSON(),
      address: ' address ',
      age: 27
    })
    expect(user2.address).toBe('address') // trim address
    expect(user2.age).toBe(27) // update age
  })

  it('fetch', async () => {
    const users = await User.insert([
      {name: 'fetch 1', email: 'email', age: 7},
      {name: 'fetch 2', email: 'email', age: 7}
    ])
    const ids = users.map(user => user._id)
    const found = await User.fetch(ids)
    expect(found.map(user => user._id)).toEqual(ids)
  })

  it('find', async () => {
    await User.insert({
      name: 'find', email: 'email', age: 7
    })
    const users = await User.find({name: 'find'})
    expect(Array.isArray(users)).toBeTruthy()
    expect(users[0].name).toBe('find')
  })
})
