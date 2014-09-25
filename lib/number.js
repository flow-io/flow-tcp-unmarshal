/**
*
*	UNMARSHAL: numeric
*
*
*	DESCRIPTION:
*		- Method for unmarshalling numeric data.
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
	*	Unmarshals TCP transmitted numeric data.
	*
	* @param {String} data - streamed data
	*/
	function unmarshal( data ) {
		return parseFloat( data );
	} // end FUNCTION unmarshal()


	// EXPORTS //

	module.exports = unmarshal;

})();