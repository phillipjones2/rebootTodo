const assert = require('assert');

describe('Array', ( ) => {
	describe('indexOf()', ( ) => {
		it('should return -1 if given number is not present', ( ) => {
			assert.equal(-1, [1,2,3].indexOf(4));
		})
	})
})