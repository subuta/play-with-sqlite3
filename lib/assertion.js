import test from 'ava'

import _ from 'lodash'

import FakeDB from './fakeDB'
import db, { restoreDump } from './db'

const fakeDB = new FakeDB(db)

test.beforeEach(async () => {
  return restoreDump()
})

// Expose full test case for testing parallel execution
export default async (t) => {
  const dbFake = await fakeDB.swap()

  let users = await dbFake.select('*').from('users')

  t.deepEqual(_.map(users, 'email'), ['hoge@piyo.com'])

  await dbFake.insert([
    {
      email: 'fuga@piyo.com',
      password: '',
      username: ''
    }
  ]).into('users')

  users = await dbFake.select('*').from('users')

  t.deepEqual(_.map(users, 'email'), ['hoge@piyo.com', 'fuga@piyo.com'])

  // Restore mocked database.
  return fakeDB.restore()
}
