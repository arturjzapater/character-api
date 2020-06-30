const express = require('express')
const F = require('fluture')
const db = require('./db')

const app = express()

app.get('/api', (req, res) => {
    db.findById('1')
    |> F.map(JSON.parse)
    |> F.fork(err => res.status(500).json(err))(data => res.status(200).json(data))
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})