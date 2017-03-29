var Helpers = require("../Helpers");

exports.code = 0x10;

exports.buildRequest = function (start, end, values) {
	var buffer = Buffer.alloc(5 + (values.length * 2));

	buffer.writeUInt16BE(start, 0);
	buffer.writeUInt16BE(end - start + 1, 2);
	buffer.writeUInt8(values.length * 2, 4);

	for (var i = 0; i < values.length; i++) {
		values[i].copy(buffer, 5 + (i * 2), 0, 2);
	}

	return buffer;
};
exports.parseRequest = function (buffer) {
	var data = {
		start : buffer.readUInt16BE(0)
	};

	data.end    = data.start + buffer.readUInt16BE(2) - 1;
	data.values = [];

	var blocks = buffer.readUInt8(4) / 2;

	for (var i = 0; i < blocks; i++) {
		data.values.push(buffer.slice(5 + (i * 2), 7 + (i * 2)));
	}

	return data;
};

exports.buildResponse = Helpers.buildStartEndAddress;
exports.parseResponse = Helpers.parseStartEndAddress;
