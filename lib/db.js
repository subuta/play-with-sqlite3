import knex from 'knex'

import fs from 'fs'

import tempy from 'tempy'

import connection from '../knexfile'

// Read dump.sql and execute each row.
const restoreDump = async () => {
  const db = knex(connection)

  const tempFile = tempy.file({ extension: 'sqlite' })
  fs.copyFileSync(require.resolve('../db/dev.sqlite'), tempFile)
  await db.raw(`ATTACH '${tempFile}' as dev`)

  return db
}

export {
  restoreDump
}

export default restoreDump
