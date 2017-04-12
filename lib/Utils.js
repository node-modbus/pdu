exports.alloc = function (size) {
	if (typeof Buffer.alloc == "function") {
		return Buffer.alloc(size);
	}

	return new Buffer(size);
};

exports.allocFrom = function (data) {
	if (typeof Buffer.from == "function") {
		return Buffer.from(data);
	}

	return new Buffer(data);
};
