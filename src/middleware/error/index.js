const formatNotFound = err => err.code === 'ENOENT'
    ? { code: 404, message: 'Not Found' }
    : err

const handleNotFount = (err, req, res, next) =>
    formatNotFound(err)
    |> next

const handleLast = (err, req, res, _next) => {
    const { code, statusCode, message } = err
    res.status(code || statusCode || 500).json({ message })
}

module.exports = {
    handleNotFount,
    handleLast,
}
