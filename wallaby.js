const _ = require('lodash')
const path = require('path')

process.env.NODE_ENV = 'test-sqlite'

module.exports = (wallaby) => {
  return {
    files: [
      'lib/**/*.js',
      'db/**/*.js',
      'knexfile.js',
      '!lib/**/*.spec.js'
    ],

    tests: [
      'lib/**/*.spec.js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        // Tell Wallaby to use Ava's Babel preset, necessary if your project doesn't use Babel otherwise.
        presets: ['@ava/babel-preset-stage-4']
      })
    },
    testFramework: 'ava'
  }
}
