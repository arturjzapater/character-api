const assert = require('assert')
const paginate = require('../src/utils/paginate')

const total = 200

describe('Paginate', () => {
    it('Given data, paginate returns an object page properties set', () => {
        const limit = 10
        const page = 2
        const expected = {
            current: 2,
            prev: 1,
            next: 3,
        }

        const result = paginate(limit)(page)(total)
        assert.deepStrictEqual(result, expected)
    })

    it('Previous page should be null if it does not exist', () => {
        const limit = 10
        const page = 0

        const result = paginate(limit)(page)(total)
        assert.equal(result.prev, null)
    })

    it('Next page should be null if it does not exist', () => {
        const limit = 100
        const page = 1

        const result = paginate(limit)(page)(total)
        assert.equal(result.next, null)
    })
})
