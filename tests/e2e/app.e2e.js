const assert = require('assert')
const request = require('supertest')
const app = require('app')

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
})
