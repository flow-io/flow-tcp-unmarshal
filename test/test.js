
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Mock writing to a stream:
	mockWrite = require( 'flow-mock-write' ),

	// Mock reading from a stream:
	mockRead = require( 'flow-mock-read' ),

	// Module to be tested:
	flowFactory = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-tcp-unmarshal', function tests() {
	'use strict';

	// SETUP //

	var flow;

	beforeEach( function() {
		flow = flowFactory();
	});

	// TESTS //

	it( 'should export a factory function', function test() {
		expect( flowFactory ).to.be.a( 'function' );
	});

	describe( 'delimiter', function tests() {

		it( 'should provide a method to set/get a delimiter', function test() {
			expect( flow.delimiter ).to.be.a( 'function' );
		});

		it( 'should throw an error if not provided a string or regular expression', function test() {
			var values = [
					5,
					true,
					NaN,
					null,
					undefined,
					[],
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}
			function badValue( value ) {
				return function() {
					flow.delimiter( value );
				};
			}
		});

		it( 'should set the delimiter', function test() {
			flow.delimiter( '\t' );
			assert.strictEqual( flow.delimiter(), '\t' );
			flow.delimiter( /\|/ );
			assert.instanceOf( flow.delimiter(), RegExp );
		});

	}); // end TESTS delimiter

	describe( 'unmashal', function tests() {

		it( 'should provide a method to set/get the unmarshal format', function test() {
			expect( flow.unmarshal ).to.be.a( 'function' );
		});

		it( 'should throw an error if not provided a string', function test() {
			var values = [
					5,
					true,
					NaN,
					null,
					undefined,
					[],
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}
			function badValue( value ) {
				return function() {
					flow.unmarshal( value );
				};
			}
		});

		it( 'should throw an error if provided an unrecognized format', function test() {
			var values = [
					'beep',
					'boop'
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}
			function badValue( value ) {
				return function() {
					flow.unmarshal( value );
				};
			}
		});

		it( 'should set the unmarshal format', function test() {
			flow.unmarshal( 'string' );
			assert.strictEqual( flow.unmarshal(), 'string' );
		});

	}); // end TESTS unmarshal

	describe( 'stream', function tests() {

		it( 'should provide a stream method', function test() {
			expect( flow.stream ).to.be.a( 'function' );
		});

		it( 'should unmarshal streamed data', function test( done ) {
			var sep = '\n',
				d,
				data,
				expected,
				stream;

			data = new Array( 10 );
			expected = new Array( data.length );
			for ( var i = 0; i < data.length; i++ ) {
				d = Math.random();
				data[ i ] = new Buffer( d.toString()+'\n' );
				expected[ i ] = d;
			}

			stream = flow
				.delimiter( sep )
				.unmarshal( 'number' )
				.stream();

			mockWrite( data, stream );
			mockRead( stream, onRead );

			return;

			/**
			* FUNCTION: onRead( error, actual )
			*	Read event handler. Checks for errors and compares streamed data to expected data.
			*/
			function onRead( error, actual ) {
				expect( error ).to.not.exist;
				for ( var i = 0; i < expected.length; i++ ) {
					assert.strictEqual(
						actual[ i ],
						expected[ i ]
					);
				}
				done();
			} // end FUNCTION onRead()

		});

	}); // end TESTS stream

});