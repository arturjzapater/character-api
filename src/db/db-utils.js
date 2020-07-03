const F = require('fluture')
const R = require('ramda')
const ffs = require('./ffs')

const appendId = data => _id => ({
    _id,
    ...data,
})

const createDocument = data => id => appendId(data)(id)
|> JSON.stringify
|> (x => ffs.writeFile(`data/${id}`, x))
|> F.map(() => id)

const getFileList = () => ffs.readdir('data')

const getLastId = () => getFileList()
|> F.map(R.last)
|> F.map(Number)

const slice = (start, end) => xs => xs.slice(start, end)

module.exports = {
    appendId,
    createDocument,
    getFileList,
    getLastId,
    slice,
}