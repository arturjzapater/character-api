const F = require('fluture')

module.exports = fn => (...args) => F.node(done => fn(...args, done))
