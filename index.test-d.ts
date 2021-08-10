import {
	Stream,
	Writable as WritableStream,
	Readable as ReadableStream,
	Duplex as DuplexStream,
	Transform as TransformStream,
} from 'node:stream';
import {expectAssignable} from 'tsd';
import {
	isStream,
	isWritableStream,
	isReadableStream,
	isDuplexStream,
	isTransformStream,
} from './index.js';

const foo = '';

if (isStream(foo)) {
	expectAssignable<Stream>(foo);
}

if (isWritableStream(foo)) {
	expectAssignable<WritableStream>(foo);
}

if (isReadableStream(foo)) {
	expectAssignable<ReadableStream>(foo);
}

if (isDuplexStream(foo)) {
	expectAssignable<DuplexStream>(new DuplexStream());
}

if (isTransformStream(foo)) {
	expectAssignable<TransformStream>(foo);
}
