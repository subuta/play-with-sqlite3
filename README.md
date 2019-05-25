# play-with-sqlite3
Play with sqlite3 and knex.

SEE: [play-with-pg](https://github.com/subuta/play-with-pg) also :)

#### How to setup

```
# Install dependencies
npm i

# Migrate database
npm run migrate

# Seed database
npm run seed

# Run concurrent tests
npm test

# Run serial tests(slower)
npm test-serial
```

#### DB related commands

```
# Generate seed
npx knex seed:make seed_name

# Generate migration
npx knex migrate:make migration_name
```
