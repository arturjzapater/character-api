const router = require('express').Router()
const validate = require('../../middleware/validate')
const {
    handleGetAll,
    handleGetOne,
    handlePost,
    handleUpdateOne,
    handleDeleteOne,
    handleWrongMethod,
} = require('./handlers')

router.route('/characters')
    .get(handleGetAll)
    .post(validate, handlePost)
    .all(handleWrongMethod([ 'GET', 'POST' ]))

router.route('/characters/:id')
    .get(handleGetOne)
    .put(validate, handleUpdateOne)
    .delete(handleDeleteOne)
    .all(handleWrongMethod([ 'GET', 'PUT', 'DELETE' ]))

module.exports = router
