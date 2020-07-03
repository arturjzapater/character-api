const router = require('express').Router()
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
    .post(handlePost)
    .all(handleWrongMethod([ 'GET', 'POST' ]))

router.route('/characters/:id')
    .get(handleGetOne)
    .put(handleUpdateOne)
    .delete(handleDeleteOne)
    .all(handleWrongMethod([ 'GET', 'PUT', 'DELETE' ]))

module.exports = router
