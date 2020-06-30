const https = require('https')
const { node } = require('fluture')

const request = opts => body => node(done => {
    const req = https.request(opts, res => {
        const data = []
        res.on('data', chunk => data.push(chunk))
        res.on('end', () => done(null, { ...res, body: data.join('') }))
    })
    req.on('error', err => done(err))
    if (body) req.write(body)
    req.end()
})

module.exports = request