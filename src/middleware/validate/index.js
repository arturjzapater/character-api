const R = require('ramda')

const propMap = [
    [ String, 'name' ],
    [ Array, 'aliases' ],
    [ String, 'occupation' ],
    [ Array, 'feats' ],
]

const checkType = doc => prop => R.propIs(...prop, doc)

module.exports = (req, res, next) => {
    R.all(checkType(req.body), propMap)
        ? next()
        : next({ code: 400, message: 'Bad Request' })
}
