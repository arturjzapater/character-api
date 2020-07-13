const fs = require('fs')
const { promisify } = require('util')
const data = require('../testData/data.json')

const { DB } = process.env

const readdir = promisify(fs.readdir)
const unlink = promisify(fs.unlink)
const writeFile = promisify(fs.writeFile)

const clearDB = () => readdir(DB)
    .then(x => Promise.all(x.map(y => unlink(`${DB}/${y}`))))

const seedDb = () => Promise.all(data
    .map((x, i) => ({ _id: i + 1, ...x }))
    .map(JSON.stringify)
    .map((x, i) => writeFile(`${DB}/${i + 1}`, x))
)

module.exports = () => clearDB()
    .then(seedDb)
