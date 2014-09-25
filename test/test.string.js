
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	unmarshal = require( './../lib/string.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'unmarshal-string', function tests() {
	'use strict';

	it( 'should export function', function test() {
		expect( unmarshal ).to.be.a( 'function' );
	});

	it( 'should unmarshal streamed string data', function test() {
		assert.strictEqual( unmarshal( 'beep' ), 'beep' );
	});

});