export function isStream(stream) {
	return stream !== null
		&& typeof stream === 'object'
		&& typeof stream.pipe === 'function';
}

export function isWritableStream(stream) {
	return isStream(stream)
		&& stream.writable !== false
		&& typeof stream.write === 'function'
		&& typeof stream.end === 'function'
		&& typeof stream.writable === 'boolean'
		&& typeof stream.writableObjectMode === 'boolean'
		&& typeof stream.destroy === 'function'
		&& typeof stream.destroyed === 'boolean';
}

export function isReadableStream(stream) {
	return isStream(stream)
		&& stream.readable !== false
		&& typeof stream.read === 'function'
		&& typeof stream.readable === 'boolean'
		&& typeof stream.readableObjectMode === 'boolean'
		&& typeof stream.destroy === 'function'
		&& typeof stream.destroyed === 'boolean';
}

export function isDuplexStream(stream) {
	return isWritableStream(stream)
		&& isReadableStream(stream);
}

export function isTransformStream(stream) {
	return isDuplexStream(stream)
		&& typeof stream._transform === 'function';
}
