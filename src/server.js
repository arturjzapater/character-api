const express = require('express')
const bodyParser = require('body-parser')
// const F = require('fluture')
// const db = require('./db')
const { api } = require('./routes')

const formatNotFound = err => err.code === 'ENOENT'
    ? { code: 404, message: 'Not Found' }
    : err

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', api)

app.use((err, req, res, next) =>
    formatNotFound(err)
    |> next
)

app.use((err, req, res, _next) => {
    const { code, statusCode, message } = err
    res.status(code || statusCode || 500).json({ message })
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})
