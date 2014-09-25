
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	unmarshal = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'unmarshal-number', function tests() {
	'use strict';

	it( 'should export function', function test() {
		expect( unmarshal ).to.be.a( 'function' );
	});

	it( 'should unmarshal streamed numeric data', function test() {
		var data = Math.random();
		assert.strictEqual( unmarshal( data.toString() ), data );
	});

});