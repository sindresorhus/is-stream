'use strict';
var fs = require('fs');
var Stream = require('stream');
var net = require('net');
var test = require('ava');
var tempfile = require('tempfile');
var isStream = require('./');

test('isStream()', function (t) {
	t.assert(isStream(new Stream.Stream()));
	t.assert(isStream(new Stream.Readable()));
	t.assert(isStream(new Stream.Writable()));
	t.assert(isStream(new Stream.Duplex()));
	t.assert(isStream(new Stream.Transform()));
	t.assert(isStream(new Stream.PassThrough()));
	t.assert(isStream(fs.createReadStream('test.js')));
	t.assert(isStream(fs.createWriteStream(tempfile())));
	t.assert(!isStream({}));
	t.assert(!isStream(null));
	t.assert(!isStream(undefined));
	t.assert(!isStream(''));
	t.assert(isStream(new net.Socket()));
	t.end();
});

test('isStream.writable()', function (t) {
	t.assert(!isStream.writable(new Stream.Stream()));
	t.assert(!isStream.writable(new Stream.Readable()));
	t.assert(isStream.writable(new Stream.Writable()));
	t.assert(isStream.writable(new Stream.Duplex()));
	t.assert(isStream.writable(new Stream.Transform()));
	t.assert(isStream.writable(new Stream.PassThrough()));
	t.assert(!isStream.writable(fs.createReadStream('test.js')));
	t.assert(isStream.writable(fs.createWriteStream(tempfile())));
	t.assert(!isStream.writable(new net.Socket()));
	t.end();
});

test('isStream.readable()', function (t) {
	t.assert(!isStream.readable(new Stream.Stream()));
	t.assert(isStream.readable(new Stream.Readable()));
	t.assert(!isStream.readable(new Stream.Writable()));
	t.assert(isStream.readable(new Stream.Duplex()));
	t.assert(isStream.readable(new Stream.Transform()));
	t.assert(isStream.readable(new Stream.PassThrough()));
	t.assert(isStream.readable(fs.createReadStream('test.js')));
	t.assert(!isStream.readable(fs.createWriteStream(tempfile())));
	t.assert(!isStream.readable(new net.Socket()));
	t.end();
});

test('isStream.duplex()', function (t) {
	t.assert(!isStream.duplex(new Stream.Stream()));
	t.assert(!isStream.duplex(new Stream.Readable()));
	t.assert(!isStream.duplex(new Stream.Writable()));
	t.assert(isStream.duplex(new Stream.Duplex()));
	t.assert(isStream.duplex(new Stream.Transform()));
	t.assert(isStream.duplex(new Stream.PassThrough()));
	t.assert(!isStream.duplex(fs.createReadStream('test.js')));
	t.assert(!isStream.duplex(fs.createWriteStream(tempfile())));
	t.end();
});
