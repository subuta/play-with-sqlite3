module.exports = (() => {
  let config = {
    client: 'sqlite3',
    connection: {
      filename: './db/dev.sqlite'
    },
    pool: {
      min: 1,
      max: 1,
      // SEE: https://github.com/tgriesser/knex/issues/1871
      disposeTimeout: 360000 * 1000,
      idleTimeoutMillis: 360000 * 1000
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }

  if (process.env.NODE_ENV === 'test') {
    config.connection = ':memory:'
  }

  return config
})()
