const express = require('express')
const bodyParser = require('body-parser')
// const F = require('fluture')
// const db = require('./db')
const { api } = require('./routes') 

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', api)

app.use((err, req, res, next) => {
    if (err.code === 'ENOENT') res.status(404).json({ message: 'Not Found' })
    else next(err)
})

// app.use((err, req, res, _next) => {
//     // console.log('lol')
//     // console.log(typeof err)
//     // console.log(err)
//     res.status(500).end()
// })

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})