const { pick, omit, defaults, isEqual } = require('lodash')

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
    const _doc = model.toJSON()
    const update = omit(_doc, indexes)
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

    if (!found) return model.save()

    const _doc = found.toJSON()
    // defaults(object, [sources]) mutates object
    const update = defaults({}, _doc, doc)
    return isEqual(update, _doc) ? _doc : _update(update)
  }

  return {
    find: (conditions) => Model.find(conditions),
    fetch: (ids) => Model.find({
      _id: {$in: ids}
    }),
    update: _update,
    insert: async docs => {
      if (Array.isArray(docs)) {
        // in parallel [x]
        // Promise.all(docs.map(_insert))

        // one after another
        const ret = []
        for (let doc of docs) {
          doc = await _insert(doc)
          ret.push(doc)
        }
        return ret
      }

      return _insert(docs)
    }
  }
}
