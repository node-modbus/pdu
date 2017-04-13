exports.alloc = function (size) {
	if (typeof Buffer.alloc == "function") {
		return Buffer.alloc(size);
	}

	return new Buffer(size);
};

exports.from = function (data, encoding) {
	if (typeof Buffer.from == "function") {
		return Buffer.from(data, encoding);
	}

	return new Buffer(data, encoding);
};
