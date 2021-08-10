import fs from 'node:fs';
import Stream from 'node:stream';
import net from 'node:net';
import test from 'ava';
import tempy from 'tempy';
import {
	isStream,
	isWritableStream,
	isReadableStream,
	isDuplexStream,
	isTransformStream,
} from './index.js';

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

test('isWritableStream()', t => {
	t.true(isWritableStream(new Stream.Writable()));
	t.true(isWritableStream(new Stream.Duplex()));
	t.true(isWritableStream(new Stream.Transform()));
	t.true(isWritableStream(new Stream.PassThrough()));
	t.true(isWritableStream(fs.createWriteStream(tempy.file())));
	t.true(isWritableStream(new net.Socket()));
	t.false(isWritableStream(new Stream.Stream()));
	t.false(isWritableStream(new Stream.Readable()));
	t.false(isWritableStream(fs.createReadStream('test.js')));
});

test('isReadableStream()', t => {
	t.true(isReadableStream(new Stream.Readable()));
	t.true(isReadableStream(new Stream.Duplex()));
	t.true(isReadableStream(new Stream.Transform()));
	t.true(isReadableStream(new Stream.PassThrough()));
	t.true(isReadableStream(fs.createReadStream('test.js')));
	t.true(isReadableStream(new net.Socket()));
	t.false(isReadableStream(new Stream.Stream()));
	t.false(isReadableStream(new Stream.Writable()));
	t.false(isReadableStream(fs.createWriteStream(tempy.file())));
});

test('isDuplexStream()', t => {
	t.true(isDuplexStream(new Stream.Duplex()));
	t.true(isDuplexStream(new Stream.Transform()));
	t.true(isDuplexStream(new Stream.PassThrough()));
	t.false(isDuplexStream(new Stream.Stream()));
	t.false(isDuplexStream(new Stream.Readable()));
	t.false(isDuplexStream(new Stream.Writable()));
	t.false(isDuplexStream(fs.createReadStream('test.js')));
	t.false(isDuplexStream(fs.createWriteStream(tempy.file())));
});

test('isTransformStream()', t => {
	t.true(isTransformStream(new Stream.Transform()));
	t.true(isTransformStream(new Stream.PassThrough()));
	t.false(isTransformStream(new Stream.Duplex()));
	t.false(isTransformStream(new Stream.Stream()));
	t.false(isTransformStream(new Stream.Readable()));
	t.false(isTransformStream(new Stream.Writable()));
	t.false(isTransformStream(fs.createReadStream('test.js')));
	t.false(isTransformStream(fs.createWriteStream(tempy.file())));
});
