import fs from 'fs';
import Stream from 'stream';
import net from 'net';
import test from 'ava';
import tempy from 'tempy';
import isStream from '.';

test('isStream()', t => {
	t.true(isStream(new Stream.Stream()));
	t.true(isStream(new Stream.Readable()));
	t.true(isStream(new Stream.Writable()));
	t.true(isStream(new Stream.Duplex()));
	t.true(isStream(new Stream.Transform()));
	t.true(isStream(new Stream.PassThrough()));
	t.true(isStream(fs.createReadStream('test.js')));
	t.true(isStream(fs.createWriteStream(tempy.file())));
	t.true(isStream(new net.Socket()));
	t.false(isStream({}));
	t.false(isStream(null));
	t.false(isStream(undefined));
	t.false(isStream(''));
});

test('isStream.writable()', t => {
	t.true(isStream.writable(new Stream.Writable()));
	t.true(isStream.writable(new Stream.Duplex()));
	t.true(isStream.writable(new Stream.Transform()));
	t.true(isStream.writable(new Stream.PassThrough()));
	t.true(isStream.writable(fs.createWriteStream(tempy.file())));
	t.false(isStream.writable(new Stream.Stream()));
	t.false(isStream.writable(new Stream.Readable()));
	t.false(isStream.writable(fs.createReadStream('test.js')));
	t.false(isStream.writable(new net.Socket()));
});

test('isStream.readable()', t => {
	t.true(isStream.readable(new Stream.Readable()));
	t.true(isStream.readable(new Stream.Duplex()));
	t.true(isStream.readable(new Stream.Transform()));
	t.true(isStream.readable(new Stream.PassThrough()));
	t.true(isStream.readable(fs.createReadStream('test.js')));
	t.false(isStream.readable(new Stream.Stream()));
	t.false(isStream.readable(new Stream.Writable()));
	t.false(isStream.readable(fs.createWriteStream(tempy.file())));
	t.false(isStream.readable(new net.Socket()));
});

test('isStream.duplex()', t => {
	t.true(isStream.duplex(new Stream.Duplex()));
	t.true(isStream.duplex(new Stream.Transform()));
	t.true(isStream.duplex(new Stream.PassThrough()));
	t.false(isStream.duplex(new Stream.Stream()));
	t.false(isStream.duplex(new Stream.Readable()));
	t.false(isStream.duplex(new Stream.Writable()));
	t.false(isStream.duplex(fs.createReadStream('test.js')));
	t.false(isStream.duplex(fs.createWriteStream(tempy.file())));
});

test('isStream.transform()', t => {
	t.true(isStream.transform(new Stream.Transform()));
	t.true(isStream.transform(new Stream.PassThrough()));
	t.false(isStream.transform(new Stream.Duplex()));
	t.false(isStream.transform(new Stream.Stream()));
	t.false(isStream.transform(new Stream.Readable()));
	t.false(isStream.transform(new Stream.Writable()));
	t.false(isStream.transform(fs.createReadStream('test.js')));
	t.false(isStream.transform(fs.createWriteStream(tempy.file())));
});
