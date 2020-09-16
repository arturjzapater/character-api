const fs = require('fs')
const app = require('./app')

const dir = 'data'
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})

process.on('SIGINT', () => {
    console.log('Stopping server')
    process.exit(0)
})
