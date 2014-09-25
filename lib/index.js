/**
*
*	STREAM: tcp-unmarshal
*
*
*	DESCRIPTION:
*		- Transform stream factory to unmarshal TCP transmitted data.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var split2 = require( 'split2' );


	// UNMARSHAL METHODS //

	var unmarshal, formats;

	unmarshal = {
		'json': require( './json.js' ),
		'number': require( './number.js' ),
		'string': require( './string.js' ),
		'boolean': require( './boolean.js' )
	};

	formats = Object.keys( unmarshal );


	// FACTORY //

	/**
	* FUNCTION: Factory()
	*	Stream factory constructor.
	*
	* @constructor
	* @returns {Factory} Factory instance
	*/
	function Factory() {
		this._delimiter = /\r?\n/;
		this._format = 'json';
		this._unmarshal = unmarshal[ 'json' ];
		return this;
	} // end FUNCTION Factory()

	/**
	* METHOD: delimiter( [value] )
	*	This method is a setter/getter. If a `delimiter` is provided, sets the data `delimiter`. If no `delimiter` is provided, returns the `delimiter` used when delineating streamed data.
	*
	* @param {String|RegExp} [value] - delimiter
	* @returns {Factory|String} Factory instance or delimiter
	*/
	Factory.prototype.delimiter = function( value ) {
		if ( !arguments.length ) {
			return this._delimiter;
		}
		if ( typeof value !== 'string' && !(value instanceof RegExp ) ) {
			throw new TypeError( 'delimiter()::invalid input argument. Delimiter must be either a string or regular expression.' );
		}
		this._delimiter = value;
		return this;
	}; // end METHOD delimiter()

	/**
	* METHOD: unmarshal( [format] )
	*	This method is a setter/getter. If a `format` is provided, sets the unmarshal `format`. If no `format` is provided, returns the unmarshal `format`.
	*
	* @param {String} format - unmarshal format
	* @returns {Factory|String} Factory instance or unmarshal format
	*/
	Factory.prototype.unmarshal = function( format ) {
		if ( !arguments.length ) {
			return this._format;
		}
		if ( typeof format !== 'string' ) {
			throw new TypeError( 'unmarshal()::invalid input argument. Format must be a string.' );
		}
		if ( formats.indexOf( format ) === -1 ) {
			throw new TypeError( 'unmarshal()::invalid input argument. Unrecognized format. Must be one of: [' + formats.join( ',' ) + '].' );
		}
		this._format = format;
		this._unmarshal = unmarshal[ format ];
		return this;
	}; // end METHOD unmarshal()

	/**
	* METHOD: stream()
	*	Returns a through stream for unmarshalling streamed data for TCP transmission.
	*
	* @returns {Stream} through stream
	*/
	Factory.prototype.stream = function() {
		return split2( this._delimiter, this._unmarshal );
	}; // end METHOD stream()

	
	// EXPORTS //

	module.exports = function createFactory() {
		return new Factory();
	};

})();