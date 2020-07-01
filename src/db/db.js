const ffs = require('./ffs')

const findById = id => ffs.readFile(`data/${id}`)

module.exports = {
    findById,
}