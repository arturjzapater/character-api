const R = require('ramda')
const paginate = require('./paginate')

const addPath = x => x !== null
    ? `/api/characters/?page=${x}`
    : null

const addPagePaths = obj => ({
    ...obj,
    prev: addPath(obj.prev),
    next: addPath(obj.next),
})

module.exports = (limit, page, count) => results =>
    paginate(limit)(parseInt(page))(count)
    |> addPagePaths
    |> R.mergeLeft({ results })
