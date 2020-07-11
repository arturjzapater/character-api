const assert = require('assert')
const fs = require('fs')
const request = require('supertest')
const app = require('app')

const { DB } = process.env

const clearDB = () => {
    fs.readdir(DB, (err, files) => {
        if (err) throw err
        
        files
            .filter(x => Number(x) > 12)
            .forEach(x => {
                fs.unlink(`${DB}/${x}`, err2 => {
                    if (err2) throw err2
                }) 
            })
    })
}

describe('GET /api/characters', () => {
    it('responds with JSON', done => {
        request(app)
            .get('/api/characters')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('reponds with an array of documents', () => {
        request(app)
            .get('/api/characters')
            .then(({ body: { results } }) => {
                assert.equal(results.length, process.env.LIMIT)
            })
    })

    it('responds with current, prev, next and count', () => {
        request(app)
            .get('/api/characters')
            .then(({ body }) => {
                assert.ok(body.hasOwnProperty('current'))
                assert.ok(body.hasOwnProperty('prev'))
                assert.ok(body.hasOwnProperty('next'))
                assert.ok(body.hasOwnProperty('count'))
            })
    })

    it('current, prev and null have appropriate values', () => {
        request(app)
            .get('/api/characters')
            .then(({ body }) => {
                const { current, prev, next } = body
                assert.equal(current, 0)
                assert.equal(prev, null)
                assert.equal(next, '/api/characters/?page=1')
            })
    })
})

describe('POST /api/characters', () => {
    beforeEach(() => {
        clearDB()
    })

    it('responds with 201 on success', done => {
        request(app)
            .post('/api/characters')
            .set('Content-Type', 'application/json')
            .send({ 
                name: 'John',
                aliases: [ 'Jim' ],
                occupation: 'baker',
                feats: [ 'Bake bread' ],
            })
            .expect(201, done)
    })

    it('responds with the location of the new document', done => {
        request(app)
            .post('/api/characters')
            .set('Content-Type', 'application/json')
            .send({
                name: 'John',
                aliases: [ 'Jim' ],
                occupation: 'baker',
                feats: [ 'Bake bread' ],
            })
            .expect('Location', /\/api\/characters\/\d+/)
            .expect(201, done)
    })

    it('accepts extra fields', done => {
        request(app)
            .post('/api/characters')
            .set('Content-Type', 'application/json')
            .send({
                name: 'John',
                aliases: [ 'Jim' ],
                occupation: 'baker',
                feats: [ 'Bake bread' ],
                granddaugther: 'Lilly',
                favouriteBook: 'The Neverending Story',
            })
            .expect(201, done)
    })

    it('responds with 400 on missing fields', done => {
        request(app)
            .post('/api/characters')
            .set('Content-Type', 'application/json')
            .send({
                name: 'Jerry',
            })
            .expect(400, done)
    })

    it('responds with 400 on wrong type input', done => {
        request(app)
            .post('/api/characters')
            .set('Content-Type', 'application/json')
            .send({
                name: 'John',
                aliases: 'Jim',
                occupation: 'baker',
                feats: [ 'Bake bread' ],
            })
            .expect(400, done)
    })
})

describe('PUT /api/character', () => {
    it('responds with 405', done => {
        request(app)
            .put('/api/characters')
            .set('Content-Type', 'application/json')
            .send({
                name: 'John',
                aliases: [ 'Jim' ],
                occupation: 'baker',
                feats: [ 'Bake bread' ],
            })
            .expect(405, done)
    })

    it('responds with a list of allowed methods', done => {
        request(app)
            .put('/api/characters')
            .set('Content-Type', 'application/json')
            .send({
                name: 'John',
                aliases: [ 'Jim' ],
                occupation: 'baker',
                feats: [ 'Bake bread' ],
            })
            .expect('Allow', /GET/)
            .expect('Allow', /POST/)
            .expect(405, done)
    })
})

describe('DELETE /api/character', () => {
    it('responds with 405', done => {
        request(app)
            .put('/api/characters')
            .set('Content-Type', 'application/json')
            .send({
                name: 'John',
                aliases: [ 'Jim' ],
                occupation: 'baker',
                feats: [ 'Bake bread' ],
            })
            .expect(405, done)
    })

    it('responds with a list of allowed methods', done => {
        request(app)
            .put('/api/characters')
            .set('Content-Type', 'application/json')
            .send({
                name: 'John',
                aliases: [ 'Jim' ],
                occupation: 'baker',
                feats: [ 'Bake bread' ],
            })
            .expect('Allow', /GET/)
            .expect('Allow', /POST/)
            .expect(405, done)
    })
})
