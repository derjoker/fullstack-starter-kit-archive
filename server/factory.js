const { pick, omit, defaults, eq } = require('lodash')

/*
 * to make use of `trim` or `required` from schema
 * const model = new Model()
 */

/*
 * @param indexes: [String] (excl. '_id')
 */
module.exports = function Facotry (db, name, schema, indexes = []) {
  const Model = db.model(name, schema)

  /*
   * doc._id is required
   * TODO: increment(_v)
   */
  function _update (doc) {
    if (!doc._id) throw new Error('doc._id undefined')

    const model = new Model(doc)
    const update = omit(model.toJSON(), indexes)
    return Model.findByIdAndUpdate(doc._id, update, {new: true})
  }

  /*
   * insert doc
   * 1. create doc if does not exist
   * 2. keep defaults, update null/undefined/(TODO: '') fields if exists
   */
  async function _insert (doc) {
    const model = new Model(doc)
    const condition = pick(model, indexes)
    const found = await Model.findOne(condition)
    // console.log(found)
    if (!found) return model.save()
    const update = defaults(found, doc)
    if (eq(update, found)) return found
    else return _update(update)
  }

  return {
    find: Model.find,
    update: _update,
    insert: _insert
  }
}
