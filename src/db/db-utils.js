const path = require('path')
const F = require('fluture')
const R = require('ramda')
const ffs = require('./ffs')

const { DB = 'data' } = process.env

const appendId = data => _id => ({
    _id,
    ...data,
})

const diff = (a, b) => a - b

const createDocument = data => id => appendId(data)(id)
|> JSON.stringify
|> (x => ffs.writeFile(path.join(DB, id.toString()), x))
|> F.map(() => id)

const getFileList = () => ffs.readdir(DB)
|> F.map(R.map(Number))
|> F.map(R.sort(diff))

const getLastId = () => getFileList()
|> F.map(R.last)

const slice = (start, end) => xs => xs.slice(start, end)

module.exports = {
    appendId,
    createDocument,
    getFileList,
    getLastId,
    slice,
}
