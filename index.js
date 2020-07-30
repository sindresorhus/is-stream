'use strict';

const isStream = stream =>
	stream !== null &&
	typeof stream === 'object' &&
	typeof stream.pipe === 'function';

isStream.writable = stream =>
	isStream(stream) &&
	stream.writable !== false &&
	typeof stream._write === 'function' &&
	typeof stream._writableState === 'object';

isStream.readable = stream =>
	isStream(stream) &&
	stream.readable !== false &&
	typeof stream._read === 'function' &&
	typeof stream._readableState === 'object';

isStream.duplex = stream =>
	isStream.writable(stream) &&
	isStream.readable(stream);

isStream.transform = stream =>
	isStream.duplex(stream) &&
	typeof stream._transform === 'function' &&
	typeof stream._transformState === 'object';

isStream.type = stream =>
	isStream.transform(stream) ? 'transform' :
		isStream.duplex(stream) ? 'duplex' :
			isStream.writable(stream) ? 'writable' :
				isStream.readable(stream) ? 'readable' :
					isStream(stream) ? 'unknown' : 'undefined';

module.exports = isStream;
