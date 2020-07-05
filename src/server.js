const express = require('express')
const bodyParser = require('body-parser')
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

process.on('SIGINT', () => {
    console.log('Stopping server')
    process.exit(0)
})
