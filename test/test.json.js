
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	unmarshal = require( './../lib/json.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'unmarshal-json', function tests() {
	'use strict';

	it( 'should export function', function test() {
		expect( unmarshal ).to.be.a( 'function' );
	});

	it( 'should unmarshal streamed JSON data', function test() {
		var data = {
			'value': Math.random()
		};
		assert.deepEqual( unmarshal( JSON.stringify(data) ), data );
	});

});