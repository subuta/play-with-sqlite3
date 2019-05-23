import knex from 'knex'
import _ from 'lodash'

import fs from 'fs'

import Promise from 'bluebird'

import connection from '../knexfile'

const db = knex(connection)

// Read dump.sql and execute each row.
const restoreDump = async () => {
  const rawDump = fs.readFileSync(require.resolve('../db/dump.sql'), 'utf8')
  const dump = _.compact(rawDump.split('\n'))
  return Promise.each(dump, (row) => db.raw(row))
}

export {
  restoreDump
}

export default db
