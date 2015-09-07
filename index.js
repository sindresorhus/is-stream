'use strict';

var isNodeEmitter = require('is-node-emitter');

var isStream = module.exports = function (stream) {
	return isNodeEmitter(stream) && typeof stream.pipe === 'function';
};

isStream.writable = function (stream) {
	return isStream(stream) && isWritable(stream);
};

isStream.readable = function (stream) {
	return isStream(stream) && isReadable(stream);
};

isStream.duplex = function (stream) {
	return isStream(stream) && isWritable(stream) && isReadable(stream);
};

function isWritable(stream) {
	return stream.writable !== false && typeof stream._write === 'function' && typeof stream._writableState === 'object';
}

function isReadable(stream) {
	return stream.readable !== false && typeof stream._read === 'function' && typeof stream._readableState === 'object';
}
