const F = require('fluture')
const db = require('../../db')
const addPageInfo = require('../../utils/addPageInfo')

const { LIMIT: limit } = process.env

const handleGetAll = (req, res, next) => {
    const page = req.query.page || 0
    const start = page * limit
    
    return db.find({ limit, start })
    |> F.map(addPageInfo(limit, page, db.getCount()))
    |> F.fork(next)(data => res.status(200).json(data))
}

const handleGetOne = (req, res, next) =>
    db.findById(req.params.id)
    |> F.fork(next)(data => res.status(200).json(data))

const handlePost = (req, res, next) =>
    db.insert(req.body)
    |> F.fork(next)(
        id => res.status(201)
            .set('Location', `/api/characters/${id}`)
            .end()
    )

const handleUpdateOne = (req, res, next) =>
    db.update(req.params.id, req.body)
    |> F.fork(next)(() => res.status(204).end())

const handleDeleteOne = (req, res, next) =>
    db.remove(req.params.id)
    |> F.fork(next)(() => res.status(204).end())

const handleWrongMethod = allowed => (req, res) =>
    res.status(405)
        .set('Allow', allowed)
        .json({
            message: 'Method Not Allowed',
            allowed,
        })

module.exports = {
    handleGetAll,
    handleGetOne,
    handlePost,
    handleUpdateOne,
    handleDeleteOne,
    handleWrongMethod,
}