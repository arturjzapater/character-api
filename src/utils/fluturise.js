const F = require('fluture')

const fluturise = fn => (...args) => F.node(done => fn(...args, done))

module.exports = fluturise
