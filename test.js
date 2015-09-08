'use strict';
var fs = require('fs');
var Stream = require('stream');
var net = require('net');
var test = require('ava');
var tempfile = require('tempfile');
var fn = require('./');

test('isStream()', function (t) {
	t.true(fn(new Stream.Stream()));
	t.true(fn(new Stream.Readable()));
	t.true(fn(new Stream.Writable()));
	t.true(fn(new Stream.Duplex()));
	t.true(fn(new Stream.Transform()));
	t.true(fn(new Stream.PassThrough()));
	t.true(fn(fs.createReadStream('test.js')));
	t.true(fn(fs.createWriteStream(tempfile())));
	t.true(fn(new net.Socket()));
	t.false(fn({}));
	t.false(fn(null));
	t.false(fn(undefined));
	t.false(fn(''));
	t.end();
});

test('isStream.writable()', function (t) {
	t.true(fn.writable(new Stream.Writable()));
	t.true(fn.writable(new Stream.Duplex()));
	t.true(fn.writable(new Stream.Transform()));
	t.true(fn.writable(new Stream.PassThrough()));
	t.true(fn.writable(fs.createWriteStream(tempfile())));
	t.false(fn.writable(new Stream.Stream()));
	t.false(fn.writable(new Stream.Readable()));
	t.false(fn.writable(fs.createReadStream('test.js')));
	t.false(fn.writable(new net.Socket()));
	t.end();
});

test('isStream.readable()', function (t) {
	t.true(fn.readable(new Stream.Readable()));
	t.true(fn.readable(new Stream.Duplex()));
	t.true(fn.readable(new Stream.Transform()));
	t.true(fn.readable(new Stream.PassThrough()));
	t.true(fn.readable(fs.createReadStream('test.js')));
	t.false(fn.readable(new Stream.Stream()));
	t.false(fn.readable(new Stream.Writable()));
	t.false(fn.readable(fs.createWriteStream(tempfile())));
	t.false(fn.readable(new net.Socket()));
	t.end();
});

test('isStream.duplex()', function (t) {
	t.true(fn.duplex(new Stream.Duplex()));
	t.true(fn.duplex(new Stream.Transform()));
	t.true(fn.duplex(new Stream.PassThrough()));
	t.false(fn.duplex(new Stream.Stream()));
	t.false(fn.duplex(new Stream.Readable()));
	t.false(fn.duplex(new Stream.Writable()));
	t.false(fn.duplex(fs.createReadStream('test.js')));
	t.false(fn.duplex(fs.createWriteStream(tempfile())));
	t.end();
});
