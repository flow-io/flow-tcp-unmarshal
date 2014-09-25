flow-tcp-unmarshal
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Transform stream factory to unmarshal TCP transmitted data.


## Installation

``` bash
$ npm install flow-tcp-unmarshal
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To create a stream factory,

``` javascript
var flowFactory = require( 'flow-tcp-unmarshal' );

// Create a new factory:
var flowStream = flowFactory();
```

The factory has the following methods...


#### flow.delimiter( [value] )

This method is a setter/getter. If no `delimiter` is provided, returns the `delimiter` used when delineating streamed data. To set the data `delimiter`,

``` javascript
// String:
flow.delimiter( ' | ' );

// Regular expression:
flow.delimiter( /\r?\n/ );
```

The default `delimiter` is a line feed: `/\r?\n/`.


#### flow.unmarshal( [format] )

This method is a setter/getter. If no `format` is provided, returns the unmarshal `format`. To set the `format`,

``` javascript
flow.unmarshal( 'number' );
```

Available formats include: `json`, `number`, `string`, and `boolean`. The default unmarshal format is `json`.


#### flow.stream()

To create a new stream,

``` javascript
var stream = flowStream.stream();
```


## Notes

When used as setters, all setter/getter methods are chainable. For example,

``` javascript
var flowFactory = require( 'flow-tcp-unmarshal' );

var stream = flowFactory()
	.delimiter( ' | ' )
	.unmarshal( 'number' )
	.stream();
```


## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	streamBuffers = require( 'stream-buffers' ),
	flowFactory = require( 'flow-tcp-unmarshal' );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/flow-tcp-unmarshal.svg
[npm-url]: https://npmjs.org/package/flow-tcp-unmarshal

[travis-image]: http://img.shields.io/travis/flow-io/flow-tcp-unmarshal/master.svg
[travis-url]: https://travis-ci.org/flow-io/flow-tcp-unmarshal

[coveralls-image]: https://img.shields.io/coveralls/flow-io/flow-tcp-unmarshal/master.svg
[coveralls-url]: https://coveralls.io/r/flow-io/flow-tcp-unmarshal?branch=master

[dependencies-image]: http://img.shields.io/david/flow-io/flow-tcp-unmarshal.svg
[dependencies-url]: https://david-dm.org/flow-io/flow-tcp-unmarshal

[dev-dependencies-image]: http://img.shields.io/david/dev/flow-io/flow-tcp-unmarshal.svg
[dev-dependencies-url]: https://david-dm.org/dev/flow-io/flow-tcp-unmarshal

[github-issues-image]: http://img.shields.io/github/issues/flow-io/flow-tcp-unmarshal.svg
[github-issues-url]: https://github.com/flow-io/flow-tcp-unmarshal/issues