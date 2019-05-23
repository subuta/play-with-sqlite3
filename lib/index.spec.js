import test from 'ava'
import db from './db'

test('should work', t => {
  console.log(db)
  t.deepEqual({ a: 1 }, { a: 1 })
})
