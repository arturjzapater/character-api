const app = require('./app')

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})

process.on('SIGINT', () => {
    console.log('Stopping server')
    process.exit(0)
})
