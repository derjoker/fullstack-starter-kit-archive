/* eslint-env jest */
import connect from './connect'
import { user } from './model'

const db = connect()

describe('model', () => {
  it('User', async () => {
    const User = db.model('User', user, 'users-test')
    const model = new User({
      name: 'test', email: 'test', age: 5
    })
    const doc = await model.save()
    expect(doc.name).toBe('test')
  })
})
