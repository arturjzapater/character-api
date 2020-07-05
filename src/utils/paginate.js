module.exports = limit => current => count => ({
    current,
    prev: current > 0
        ? current - 1
        : null,
    next: current < count / limit - 1
        ? current + 1
        : null,
    count,
})
