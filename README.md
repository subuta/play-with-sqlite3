# play-with-sqlite3
Play with sqlite3 and knex.


#### How to setup

```
# Install dependencies
npm i

# Migrate database
npm run migrate

# Seed database
npm run seed

# Run tests
npm test
```

#### DB related commands

```
# Generate seed
npx knex seed:make seed_name

# Generate migration
npx knex migrate:make migration_name
```
