/// <reference types="node"/>
import * as stream from 'stream';

declare const isStream: {
	/**
	@returns Whether `stream` is a [`Stream`](https://nodejs.org/api/stream.html#stream_stream).

	@example
	```
	import * as fs from 'fs';
	import isStream = require('is-stream');

	isStream(fs.createReadStream('unicorn.png'));
	//=> true

	isStream({});
	//=> false
	```
	*/
	(stream: unknown): stream is stream.Stream;

	/**
	@returns Whether `stream` is a [`stream.Writable`](https://nodejs.org/api/stream.html#stream_class_stream_writable).

	@example
	```
	import * as fs from 'fs';
	import isStream = require('is-stream');

	isStream.writable(fs.createWriteStrem('unicorn.txt'));
	//=> true
	```
	*/
	writable(stream: unknown): stream is stream.Writable;

	/**
	@returns Whether `stream` is a [`stream.Readable`](https://nodejs.org/api/stream.html#stream_class_stream_readable).

	@example
	```
	import * as fs from 'fs';
	import isStream = require('is-stream');

	isStream.readable(fs.createReadStream('unicorn.png'));
	//=> true
	```
	*/
	readable(stream: unknown): stream is stream.Readable;

	/**
	@returns Whether `stream` is a [`stream.Duplex`](https://nodejs.org/api/stream.html#stream_class_stream_duplex).

	@example
	```
	import {Duplex} from 'stream';
	import isStream = require('is-stream');

	isStream.duplex(new Duplex());
	//=> true
	```
	*/
	duplex(stream: unknown): stream is stream.Duplex;

	/**
	@returns Whether `stream` is a [`stream.Transform`](https://nodejs.org/api/stream.html#stream_class_stream_transform).

	@example
	```
	import * as fs from 'fs';
	import Stringify = require('streaming-json-stringify');
	import isStream = require('is-stream');

	isStream.transform(Stringify());
	//=> true
	```
	*/
	transform(input: unknown): input is stream.Transform;

	/**
	@returns Returns a `string` to tell the [`type of stream`](https://nodejs.org/api/stream.html#stream_types_of_streams): `readable`, `writable`, `duplex`, `transform` or `unknown` for unknown stream type and `undefined` for non streams.

	@example
	```
	import * as fs from 'fs';
	import Stream from 'stream';
	import isStream = require('is-stream');

	isStream.type(fs.createReadStream('unicorn.png'));
	//=> 'readable'

	isStream.type(fs.createWriteStream('unicorn.png'));
	//=> 'writable'

	isStream.type({});
	//=> undefined

	isStream.type(new Stream.Stream());
	//=> unknown
	```
	*/
	type(input: unknown): input is any;
};

export = isStream;
