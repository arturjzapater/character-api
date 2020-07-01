module.exports = limit => current => total => ({
    current,
    prev: current > 0
        ? current - 1
        : null,
    next: current < total / limit - 1
        ? current + 1
        : null,
})
