
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	unmarshal = require( './../lib/boolean.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'unmarshal-boolean', function tests() {
	'use strict';

	it( 'should export function', function test() {
		expect( unmarshal ).to.be.a( 'function' );
	});

	it( 'should unmarshal streamed boolean data', function test() {
		assert.strictEqual( unmarshal( '1' ), true );
		assert.strictEqual( unmarshal( '0' ), false );
	});

});