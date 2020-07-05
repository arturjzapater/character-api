const R = require('ramda')

const propMap = [
    [ String, 'name' ],
    [ Array, 'aliases' ],
    [ String, 'occupation' ],
    [ Array, 'feats' ],
]

const checkType = doc => prop => R.propIs(...prop, doc)

const checkNotEmpty = prop => obj => R.prop(prop, obj)
|> R.isEmpty
|> R.not

const checkName = checkNotEmpty('name')
const checkOccupation = checkNotEmpty('occupation')

const checkDocument = doc => R.all(checkType(doc), propMap)
    && checkName(doc)
    && checkOccupation(doc)

module.exports = (req, res, next) => {
    checkDocument(req.body)
        ? next()
        : next({ code: 400, message: 'Bad Request' })
}
