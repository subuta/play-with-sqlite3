import knex from 'knex'
import _ from 'lodash'

import fs from 'fs'

import Promise, { promisify } from 'bluebird'

import connection from '../knexfile'

const db = knex(connection)

const runRawQuery = async (db, query) => {
  const connection = await db.client.acquireConnection()

  const runAsync = () => new Promise((resolve, reject) => {
    connection.run(query, [], (err, response) => {
      console.log(err)
      if (err) return reject(err)
      console.log(response)
      resolve()
    })
  })

  try {
    await runAsync()
  } finally {
    db.client.releaseConnection(connection)
  }
  return Promise.resolve()
}

// Read dump.sql and execute each row.
const restoreDump = async () => {
  const rawDump = fs.readFileSync(require.resolve('../db/dump.sql'), 'utf8')
  const dump = _.compact(rawDump.split('\n'))
  
  const query = `
    CREATE TABLE \`knex_migrations\` (\`id\` integer not null primary key autoincrement, \`name\` varchar(255), \`batch\` integer, \`migration_time\` datetime);
    INSERT INTO knex_migrations VALUES(1,'20190523222516_add_users.js',1,1558658761640);
    CREATE TABLE \`users\` (\`id\` integer not null primary key autoincrement, \`email\` varchar(255) not null, \`password\` varchar(255), \`username\` varchar(255) not null, \`created_at\` datetime not null default CURRENT_TIMESTAMP, \`updated_at\` datetime not null default CURRENT_TIMESTAMP);
    INSERT INTO users VALUES(1,'hoge@piyo.com','$2b$04$LU7ML7zic0zIChS4WrrC2OLT60gYLiWxH.Fpxj9GH1pWkvefRtG0W','o5kTTepD8xnTZkGjnfx2mn','2019-05-24 00:46:04','2019-05-24 00:46:04');
    DELETE FROM sqlite_sequence;
    INSERT INTO sqlite_sequence VALUES('knex_migrations',1);
    INSERT INTO sqlite_sequence VALUES('users',1);
  `

  await runRawQuery(db, query)



  // const runAsync = promisify(connection.run.bind(connection))
  // const allAsync = promisify(connection.all.bind(connection))

  // await runAsync()

  // await runAsync(`
  //   CREATE TABLE \`knex_migrations\` (\`id\` integer not null primary key autoincrement, \`name\` varchar(255), \`batch\` integer, \`migration_time\` datetime);
  //   INSERT INTO knex_migrations VALUES(1,'20190523222516_add_users.js',1,1558658761640);
  //   CREATE TABLE \`users\` (\`id\` integer not null primary key autoincrement, \`email\` varchar(255) not null, \`password\` varchar(255), \`username\` varchar(255) not null, \`created_at\` datetime not null default CURRENT_TIMESTAMP, \`updated_at\` datetime not null default CURRENT_TIMESTAMP);
  //   INSERT INTO users VALUES(1,'hoge@piyo.com','$2b$04$LU7ML7zic0zIChS4WrrC2OLT60gYLiWxH.Fpxj9GH1pWkvefRtG0W','o5kTTepD8xnTZkGjnfx2mn','2019-05-24 00:46:04','2019-05-24 00:46:04');
  //   DELETE FROM sqlite_sequence;
  //   INSERT INTO sqlite_sequence VALUES('knex_migrations',1);
  //   INSERT INTO sqlite_sequence VALUES('users',1);
  // `)

  // await Promise.each(dump, (row) => db.raw(row))

  // await Promise.each(dump, (row) => db.raw(row))

  // const tables = await db.raw(`
  //   SELECT name AS table_name
  //   FROM sqlite_master
  //   WHERE type='table';
  // `)

  // const users = await db.raw(`
  //   select * from users;
  // `)

  // console.log(tables)

  return Promise.resolve()
}

export {
  restoreDump
}

export default db
