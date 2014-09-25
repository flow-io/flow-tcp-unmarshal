var eventStream = require( 'event-stream' ),
	streamBuffers = require( 'stream-buffers' ),
	flowFactory = require( './../lib' );

// Create a readable buffer stream:
var source = new streamBuffers.ReadableStreamBuffer({
	'frequency': 0 // ms; pipe data immediately
});

// Create a stream to unmarshal data:
var unmarshal = flowFactory()
	.delimiter( ' | ' )
	.unmarshal( 'number' )
	.stream();

// Create the pipeline:
source
	.pipe( unmarshal )
	.pipe( eventStream.map( function( d, clbk ){
		clbk( null, d.toString()+'\n' );
	}))
	.pipe( process.stdout );

// Write some data...
var data;
for ( var i = 0; i < 20; i++ ) {
	data = Math.random().toString();
	if ( i < 20-1 ) {
		data += ' | ';
	}
	source.put( data, 'utf8' );
}