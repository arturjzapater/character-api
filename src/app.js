const express = require('express')
const { error } = require('./middleware')
const { api } = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', api)

app.use(error.handleNotFount)
app.use(error.handleLast)

module.exports = app
