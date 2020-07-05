const assert = require('assert')
const validate = require('middleware/validate')

const badRequest = {
    code: 400,
    message: 'Bad Request',
}

describe('Validate', () => {
    it('calls next if validation passes', done => {
        const req = {
            body: {
                name: 'John',
                aliases: [],
                occupation: 'bartender',
                feats: [ 'serve good beer' ],
            },
        }
        const nextOk = (...args) => {
            assert.equal(args.length, 0)
            done()
        }
        validate(req, {}, nextOk)
    })

    it('calls next with error when incomplete document is passed', done => {
        const req = {
            body: {
                name: 'John',
            },
        }
        const nextNotOk = error => {
            assert.deepStrictEqual(error, badRequest)
            done()
        }
        validate(req, {}, nextNotOk)
    })

    it('calls next witth error when wrong type is passed', done => {
        const req = {
            body: {
                name: 12,
                aliases: [],
                occupation: 'bartender',
                feats: [ 'serve good beer' ],
            },
        }
        const nextNotOk = error => {
            assert.deepStrictEqual(error, badRequest)
            done()
        }
        validate(req, {}, nextNotOk)
    })

    it('fails when name is an empty string', done => {
        const req = {
            body: {
                name: '',
                aliases: [],
                occupation: 'potato',
                feats: [],
            },
        }
        const nextNotOk = error => {
            assert.deepStrictEqual(error, badRequest)
            done()
        }
        validate(req, {}, nextNotOk)
    })
})
