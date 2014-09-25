/**
*
*	UNMARSHAL: JSON
*
*
*	DESCRIPTION:
*		- Method for unmarshalling JSON data.
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

(function(){
	'use strict';

	/**
	* FUNCTION: unmarshal( data )
	*	Unmarshals TCP transmitted JSON data.
	*
	* @param {String} data - streamed data
	*/
	function unmarshal( data ) {
		return JSON.parse( data );
	} // end FUNCTION unmarshal()


	// EXPORTS //

	module.exports = unmarshal;

})();