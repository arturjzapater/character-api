const fs = require('fs')
const data = require('./seedData.json')

const dir = '../data'

if (!fs.existsSync(dir)) fs.mkdirSync(dir)

data
    .map((x, i) => ({ _id: i + 1, ...x }))
    .map(JSON.stringify)
    .forEach((x, i) => {
        fs.writeFile(`../data/${i + 1}`, x, err => {
            if (err) console.log(err)
            else console.log(`File ${i + 1} written successfully`)
        })
    })
