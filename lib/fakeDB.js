import _ from 'lodash'

export default class FakeDB {
  constructor (db) {
    this.afterDone = _.noop
    this.db = db
    this.trx = null
  }

  swap () {
    return new Promise((resolve) => {
      // Some initial actions, transaction is stated here
      this.db.transaction((t) => {
        this.trx = t
        // service('DB', this.trx)
        resolve(t)
      }).catch((e) => {
        this.afterDone()
      })
    })
  }

  restore () {
    return new Promise((resolve) => {
      this.afterDone = resolve
      this.trx.rollback()
    })
  }
}
