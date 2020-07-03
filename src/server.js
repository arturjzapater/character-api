const express = require('express')
const bodyParser = require('body-parser')
// const F = require('fluture')
// const db = require('./db')
const { error } = require('./middleware')
const { api } = require('./routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', api)

app.use(error.handleNotFount)
app.use(error.handleLast)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})
