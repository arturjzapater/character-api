const express = require('express')
const F = require('fluture')
const db = require('./db')

const app = express()

app.get('/api', (req, res) => {
    db.insert({ carrots: 12, potatoes: 18 })
    |> F.fork(err => res.status(500).json(err))(data => res.status(200).json(data))
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})