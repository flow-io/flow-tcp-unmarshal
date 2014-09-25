/**
*
*	UNMARSHAL: boolean
*
*
*	DESCRIPTION:
*		- Method for unmarshalling boolean data.
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
	*	Unmarshals TCP transmitted boolean data.
	*
	* @param {String} data - streamed data
	*/
	function unmarshal( data ) {
		if ( data === '1' ) {
			return true;
		}
		return false;
	} // end FUNCTION unmarshal()


	// EXPORTS //

	module.exports = unmarshal;

})();