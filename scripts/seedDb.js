const fs = require('fs')

const data = [{
    name: 'Feänor',
    aliases: [ 
        'Fëanáro',
        'Curufinwë',
        'Finwion',
    ],
    race: 'elf',
    occupation: 'craftsman',
    feats: [
        'Craft silmarils',
        'Craft palantíri',
        'Invent Tengwar script',
    ],
},{
    name: 'Túrin',
    aliases: [ 'Turambar' ],
    race: 'human',
    occupation: 'warrior',
    feats: [
        'Knight of the sword',
        'Chief counsellor of Orodreth',
    ],
},{
    name: 'Lúthien',
    aliases: [ 'Tinúviel' ],
    race: 'elf',
    occupation: 'princess',
    feats: [
        'Cause Morgoth and his court to fall asleep',
        'Retrieve one silmaril together with Beren',
        'Become mortal for love\'s sake',
    ],
}]

data
    .map(JSON.stringify)
    .forEach((x, i) => {
        fs.writeFile(`../data/${i + 1}`, x, err => {
            if (err) console.log(err)
            else console.log(`File ${i + 1} written successfully`)
        })
    })