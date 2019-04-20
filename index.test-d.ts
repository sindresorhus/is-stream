import {expectType} from 'tsd';
import * as stream from 'stream';
import isStream = require('.');

const foo = '';

if (isStream(foo)) {
	expectType<stream.Stream>(foo);
}

if (isStream.writable(foo)) {
	expectType<stream.Writable>(foo);
}

if (isStream.readable(foo)) {
	expectType<stream.Readable>(foo);
}

if (isStream.duplex(foo)) {
	expectType<stream.Duplex>(new stream.Duplex());
}

if (isStream.transform(foo)) {
	expectType<stream.Transform>(foo);
}
