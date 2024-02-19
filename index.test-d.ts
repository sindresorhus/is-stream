import {
	type Stream,
	type Writable as WritableStream,
	type Readable as ReadableStream,
	Duplex as DuplexStream,
	type Transform as TransformStream,
} from 'node:stream';
import {expectType, expectAssignable} from 'tsd';
import {
	isStream,
	isWritableStream,
	isReadableStream,
	isDuplexStream,
	isTransformStream,
	type Options,
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

isStream(foo, {});
isStream(foo, {checkOpen: false});
isWritableStream(foo, {});
isWritableStream(foo, {checkOpen: false});
isReadableStream(foo, {});
isReadableStream(foo, {checkOpen: false});
isDuplexStream(foo, {});
isDuplexStream(foo, {checkOpen: false});
isTransformStream(foo, {});
isTransformStream(foo, {checkOpen: false});

expectType<boolean | undefined>({} as Options['checkOpen']);
