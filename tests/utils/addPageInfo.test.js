const assert = require('assert')
const addPageInfo = require('utils/addPageInfo')

const data = [{
    a: 1,
    b: 2,
}, {
    a: 4,
    b: 7,
}]

describe('addPageInfo', () => {
    it('Adds the proper fields to the data', () => {
        const page = 1
        const count = 100
        const limit = 10

        const expected = {
            current: 1,
            next: '/api/characters/?page=2',
            prev: '/api/characters/?page=0',
            count,
            results: data,
        }

        const result = addPageInfo(limit, page, count)(data)
        assert.deepStrictEqual(result, expected)
    })

    it('If there is no next page, the value is null', () => {
        const page = 2
        const count = 30
        const limit = 10
        
        const result = addPageInfo(limit, page, count)(data)
        assert.strictEqual(result.next, null)
    })

    it('If there is not previous page, the value is null', () => {
        const page = 0
        const count = 30
        const limit = 10
        
        const result = addPageInfo(limit, page, count)(data)
        assert.strictEqual(result.prev, null)
    })
})
