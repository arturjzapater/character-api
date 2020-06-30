const F = require('fluture')

const fluturise = fn => (...args) => F.node(done => {
    fn(...args, (err, data) => {
        if (err) return done(err)
        else return done(null, data)
    })
})

module.exports = fluturise
