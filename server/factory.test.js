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
      name: ' insert ', email: 'test', age: 7
    })
    expect(user._id).toBeTruthy()
    expect(user.name).toBe('insert')
    expect(user.email).toBe('test')
    expect(user.age).toBe(7)
  })

  it('insert docs', async () => {})

  it('update', async () => {
    const user = await User.insert({
      name: 'update', email: 'test', age: 7
    })
    const user2 = await User.update({
      ...user.toJSON(),
      address: ' address ',
      age: 27
    })
    expect(user2.address).toBe('address') // trim address
    expect(user2.age).toBe(27) // update age
  })
})
