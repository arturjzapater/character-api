const R = require('ramda')

const propMap = [
    [ 'name', String ],
    [ 'aliases', Array ],
    [ 'occupation', String ],
    [ 'feats', Array ],
]

module.exports = (req, res, next) => {
    if (propMap.every(([ p, t ]) => R.propIs(t, p, req.body))) {
        next()
    } else {
        next({ code: 400, message: 'Bad Request' })
    }
}
