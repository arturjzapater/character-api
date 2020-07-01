const assert = require('assert')
const paginate = require('../src/utils/paginate')

const data = Array.from({ length: 200 }, (_, i) => ({ doc: i }))

describe('Paginate', () => {
    it('Given data, paginate returns an object page properties set', () => {
        const limit = 10
        const page = 2
        const expected = {
            current: 2,
            prev: 1,
            next: 3,
            data: Array.from({ length: limit }, (_, i) => ({ doc: i + page * limit })),
        }

        const result = paginate(limit)(page)(data)
        assert.deepStrictEqual(result, expected)
    })

    it('Previous page should be null if it does not exist', () => {
        const limit = 10
        const page = 0

        const result = paginate(limit)(page)(data)
        assert.equal(result.prev, null)
    })

    it('Next page should be null if it does not exist', () => {
        const limit = 100
        const page = 1

        const result = paginate(limit)(page)(data)
        assert.equal(result.next, null)
    })
})