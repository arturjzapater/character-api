const path = require('path')
const F = require('fluture')
const R = require('ramda')
const ffs = require('./ffs')
const { createDocument, getFileList, getLastId, slice } = require('./db-utils')

const { DB = 'data' } = process.env

const getCount = () => getFileList()
|> F.map(R.length)

const remove = id => ffs.unlink(path.join(DB, id))

const findById = id => ffs.readFile(path.join(DB, id), 'utf-8')
|> F.map(JSON.parse)

const find = ({ limit = 10, start = 0 } = {}) => getFileList()
|> F.map(slice(start, start + limit))
|> F.map(R.map(findById))
|> F.chain(F.parallel(10))

const insert = data => getLastId()
|> F.map(R.add(1))
|> F.chain(createDocument(data))

const update = (id, data) => findById(id)
|> F.map(R.mergeLeft(data))
|> F.map(JSON.stringify)
|> F.chain(x => ffs.writeFile(path.join(DB, id), x))

module.exports = {
    find,
    findById,
    getCount,
    insert,
    remove,
    update,
}
