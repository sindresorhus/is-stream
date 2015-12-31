import fs from 'fs';
import Stream from 'stream';
import net from 'net';
import test from 'ava';
import tempfile from 'tempfile';
import m from './';

test('isStream()', t => {
	t.true(m(new Stream.Stream()));
	t.true(m(new Stream.Readable()));
	t.true(m(new Stream.Writable()));
	t.true(m(new Stream.Duplex()));
	t.true(m(new Stream.Transform()));
	t.true(m(new Stream.PassThrough()));
	t.true(m(fs.createReadStream('test.js')));
	t.true(m(fs.createWriteStream(tempfile())));
	t.true(m(new net.Socket()));
	t.false(m({}));
	t.false(m(null));
	t.false(m(undefined));
	t.false(m(''));
});

test('isStream.writable()', t => {
	t.true(m.writable(new Stream.Writable()));
	t.true(m.writable(new Stream.Duplex()));
	t.true(m.writable(new Stream.Transform()));
	t.true(m.writable(new Stream.PassThrough()));
	t.true(m.writable(fs.createWriteStream(tempfile())));
	t.false(m.writable(new Stream.Stream()));
	t.false(m.writable(new Stream.Readable()));
	t.false(m.writable(fs.createReadStream('test.js')));
	t.false(m.writable(new net.Socket()));
});

test('isStream.readable()', t => {
	t.true(m.readable(new Stream.Readable()));
	t.true(m.readable(new Stream.Duplex()));
	t.true(m.readable(new Stream.Transform()));
	t.true(m.readable(new Stream.PassThrough()));
	t.true(m.readable(fs.createReadStream('test.js')));
	t.false(m.readable(new Stream.Stream()));
	t.false(m.readable(new Stream.Writable()));
	t.false(m.readable(fs.createWriteStream(tempfile())));
	t.false(m.readable(new net.Socket()));
});

test('isStream.duplex()', t => {
	t.true(m.duplex(new Stream.Duplex()));
	t.true(m.duplex(new Stream.Transform()));
	t.true(m.duplex(new Stream.PassThrough()));
	t.false(m.duplex(new Stream.Stream()));
	t.false(m.duplex(new Stream.Readable()));
	t.false(m.duplex(new Stream.Writable()));
	t.false(m.duplex(fs.createReadStream('test.js')));
	t.false(m.duplex(fs.createWriteStream(tempfile())));
});
