const ffs = require('./ffs')

const findById = id => ffs.readFile(`data/${id}.json`)

module.exports = {
    findById,
}