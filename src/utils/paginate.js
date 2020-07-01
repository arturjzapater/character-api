const getPage = page => x => typeof x === 'undefined' ? null : page

const getBoundaries = (limit, page, xs) => ({
    page,
    start: page * limit,
    end: (page + 1) * limit,
    data: xs,
})

const makeObj = ({ page, start, end, data }) => ({
    current: page,
    prev: getPage(page - 1)(data[start - 1]),
    next: getPage(page + 1)(data[end]),
    data: data.slice(start, end),
})

const paginate = limit => page => xs =>
    getBoundaries(limit, page, xs)
    |> makeObj

module.exports = paginate