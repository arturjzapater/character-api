const assert = require('assert')
const request = require('supertest')
const app = require('app')
const prepare = require('./prepare')
const data = require('../testData/data.json')

describe('GET /api/characters/:id', () => {
    beforeEach(done => {
        prepare()
            .then(() => done())
    })

    it('responds with 200 on success', done => {
        request(app)
            .get('/api/characters/1')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('responds with the document asked for', () => {
        request(app)
            .get('/api/characters/1')
            .then(({ body: res }) => {
                assert.deepStrictEqual(res, { _id: 1, ...data[0] })
            })
    })

    it('responds with 404 if the document doesn\'t exist', done => {
        request(app)
            .get('/api/characters/NaN')
            .expect(404, done)
    })
})

describe('POST /api/characters/:id', () => {
    beforeEach(done => {
        prepare()
            .then(() => done())
    })
    
    it('responds with 405', done => {
        request(app)
            .post('/api/characters/1')
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
            .post('/api/characters/1')
            .set('Content-Type', 'application/json')
            .send({
                name: 'John',
                aliases: [ 'Jim' ],
                occupation: 'baker',
                feats: [ 'Bake bread' ],
            })
            .expect('Allow', /GET/)
            .expect('Allow', /PUT/)
            .expect('Allow', /DELETE/)
            .expect(405, done)
    })
})
