import fs from 'node:fs';
import Stream from 'node:stream';
import http from 'node:http';
import net from 'node:net';
import test from 'ava';
import {temporaryFile} from 'tempy';
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
	t.true(isStream(fs.createWriteStream(temporaryFile())));
	t.true(isStream(new http.OutgoingMessage()));
	t.true(isStream(new http.IncomingMessage()));
	t.true(isStream(new http.ServerResponse({})));
	t.true(isStream(new http.ClientRequest('http://example.com')));
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
	t.true(isWritableStream(fs.createWriteStream(temporaryFile())));
	t.true(isWritableStream(new http.OutgoingMessage()));
	t.true(isWritableStream(new http.ServerResponse({})));
	t.true(isWritableStream(new http.ClientRequest('http://example.com')));
	t.true(isWritableStream(new net.Socket()));
	t.false(isWritableStream(new Stream.Stream()));
	t.false(isWritableStream(new Stream.Readable()));
	t.false(isWritableStream(fs.createReadStream('test.js')));
	t.false(isWritableStream(new http.IncomingMessage()));
	t.false(isWritableStream({}));
	t.false(isWritableStream(null));
	t.false(isWritableStream(undefined));
	t.false(isWritableStream(''));
});

test('isReadableStream()', t => {
	t.true(isReadableStream(new Stream.Readable()));
	t.true(isReadableStream(new Stream.Duplex()));
	t.true(isReadableStream(new Stream.Transform()));
	t.true(isReadableStream(new Stream.PassThrough()));
	t.true(isReadableStream(fs.createReadStream('test.js')));
	t.true(isReadableStream(new http.IncomingMessage()));
	t.true(isReadableStream(new net.Socket()));
	t.false(isReadableStream(new Stream.Stream()));
	t.false(isReadableStream(new Stream.Writable()));
	t.false(isReadableStream(fs.createWriteStream(temporaryFile())));
	t.false(isReadableStream(new http.OutgoingMessage()));
	t.false(isReadableStream(new http.ServerResponse({})));
	t.false(isReadableStream(new http.ClientRequest('http://example.com')));
	t.false(isReadableStream({}));
	t.false(isReadableStream(null));
	t.false(isReadableStream(undefined));
	t.false(isReadableStream(''));
});

test('isDuplexStream()', t => {
	t.true(isDuplexStream(new Stream.Duplex()));
	t.true(isDuplexStream(new Stream.Transform()));
	t.true(isDuplexStream(new Stream.PassThrough()));
	t.true(isDuplexStream(new net.Socket()));
	t.false(isDuplexStream(new Stream.Stream()));
	t.false(isDuplexStream(new Stream.Readable()));
	t.false(isDuplexStream(new Stream.Writable()));
	t.false(isDuplexStream(fs.createReadStream('test.js')));
	t.false(isDuplexStream(fs.createWriteStream(temporaryFile())));
	t.false(isDuplexStream(new http.OutgoingMessage()));
	t.false(isDuplexStream(new http.IncomingMessage()));
	t.false(isDuplexStream(new http.ServerResponse({})));
	t.false(isDuplexStream(new http.ClientRequest('http://example.com')));
	t.false(isDuplexStream({}));
	t.false(isDuplexStream(null));
	t.false(isDuplexStream(undefined));
	t.false(isDuplexStream(''));
});

test('isTransformStream()', t => {
	t.true(isTransformStream(new Stream.Transform()));
	t.true(isTransformStream(new Stream.PassThrough()));
	t.false(isTransformStream(new Stream.Stream()));
	t.false(isTransformStream(new Stream.Readable()));
	t.false(isTransformStream(new Stream.Writable()));
	t.false(isTransformStream(new Stream.Duplex()));
	t.false(isTransformStream(fs.createReadStream('test.js')));
	t.false(isTransformStream(fs.createWriteStream(temporaryFile())));
	t.false(isTransformStream(new http.OutgoingMessage()));
	t.false(isTransformStream(new http.IncomingMessage()));
	t.false(isTransformStream(new http.ServerResponse({})));
	t.false(isTransformStream(new http.ClientRequest('http://example.com')));
	t.false(isTransformStream(new net.Socket()));
	t.false(isTransformStream({}));
	t.false(isTransformStream(null));
	t.false(isTransformStream(undefined));
	t.false(isTransformStream(''));
});

// eslint-disable-next-line max-params
const testStreamOpen = (t, stream, checkMethod, expectedResult, options) => {
	t.true(checkMethod(stream, options));
	stream.destroy();
	t.is(checkMethod(stream, options), expectedResult);
};

test('isStream(readable), no options', testStreamOpen, new Stream.Readable(), isStream, false);
test('isStream(readable, {})', testStreamOpen, new Stream.Readable(), isStream, false, {});
test('isStream(readable, {checkOpen: true})', testStreamOpen, new Stream.Readable(), isStream, false, {checkOpen: true});
test('isStream(readable, {checkOpen: false})', testStreamOpen, new Stream.Readable(), isStream, true, {checkOpen: false});
test('isStream(writable), no options', testStreamOpen, new Stream.Writable(), isStream, false);
test('isStream(writable, {})', testStreamOpen, new Stream.Writable(), isStream, false, {});
test('isStream(writable, {checkOpen: true})', testStreamOpen, new Stream.Writable(), isStream, false, {checkOpen: true});
test('isStream(writable, {checkOpen: false})', testStreamOpen, new Stream.Writable(), isStream, true, {checkOpen: false});
test('isWritableStream(writable), no options', testStreamOpen, new Stream.Writable(), isWritableStream, false);
test('isWritableStream(writable, {})', testStreamOpen, new Stream.Writable(), isWritableStream, false, {});
test('isWritableStream(writable, {checkOpen: true})', testStreamOpen, new Stream.Writable(), isWritableStream, false, {checkOpen: true});
test('isWritableStream(writable, {checkOpen: false})', testStreamOpen, new Stream.Writable(), isWritableStream, true, {checkOpen: false});
test('isReadableStream(readable), no options', testStreamOpen, new Stream.Readable(), isReadableStream, false);
test('isReadableStream(readable, {})', testStreamOpen, new Stream.Readable(), isReadableStream, false, {});
test('isReadableStream(readable, {checkOpen: true})', testStreamOpen, new Stream.Readable(), isReadableStream, false, {checkOpen: true});
test('isReadableStream(readable, {checkOpen: false})', testStreamOpen, new Stream.Readable(), isReadableStream, true, {checkOpen: false});
test('isDuplexStream(duplex), no options', testStreamOpen, new Stream.Duplex(), isDuplexStream, false);
test('isDuplexStream(duplex, {})', testStreamOpen, new Stream.Duplex(), isDuplexStream, false, {});
test('isDuplexStream(duplex, {checkOpen: true})', testStreamOpen, new Stream.Duplex(), isDuplexStream, false, {checkOpen: true});
test('isDuplexStream(duplex, {checkOpen: false})', testStreamOpen, new Stream.Duplex(), isDuplexStream, true, {checkOpen: false});
test('isTransformStream(transform), no options', testStreamOpen, new Stream.Transform(), isTransformStream, false);
test('isTransformStream(transform, {})', testStreamOpen, new Stream.Transform(), isTransformStream, false, {});
test('isTransformStream(transform, {checkOpen: true})', testStreamOpen, new Stream.Transform(), isTransformStream, false, {checkOpen: true});
test('isTransformStream(transform, {checkOpen: false})', testStreamOpen, new Stream.Transform(), isTransformStream, true, {checkOpen: false});
