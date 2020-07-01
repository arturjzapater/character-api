const fs = require('fs')
const fluturise = require('../utils/fluturise')

const readdir = fluturise(fs.readdir)
const readFile = fluturise(fs.readFile)
const unlink = fluturise(fs.unlink)
const writeFile = fluturise(fs.writeFile)

module.exports = {
    readdir,
    readFile,
    unlink,
    writeFile,
}
