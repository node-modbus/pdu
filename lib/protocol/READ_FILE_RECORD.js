var Helpers = require("../Helpers");
var Buff    = require("../Buffer");

exports.code = 0x14;

exports.buildRequest = function (requests) {
	var buffer = Buff.alloc(1 + (7 * requests.length));
	var offset = 1;

	buffer.writeUInt8(buffer.length - 1, 0);

	for (var i = 0; i < requests.length; i++) {
		buffer.writeUInt8(0x06, offset);
		buffer.writeUInt16BE(requests[i].file, offset + 1);
		buffer.writeUInt16BE(requests[i].address, offset + 3);
		buffer.writeUInt16BE(requests[i].length, offset + 5);

		offset += 7;
	}

	return buffer;
};
exports.parseRequest = function (buffer) {
	if (buffer.length < 7) return null;

	var data     = [];
	var offset   = 2;
	var requests = (buffer.length - 1) / 7;

	for (var i = 0; i < requests; i++) {
		data.push({
			file    : buffer.readUInt16BE(offset),
			address : buffer.readUInt16BE(offset + 2),
			length  : buffer.readUInt16BE(offset + 4)
		});

		offset += 7;
	}

	return data;
};

exports.buildResponse = function (responses) {
	var data_len = responses.reduce(function (len, response) {
		return len + (response.length * 2);
	}, 0);
	var buffer = Buff.alloc(1 + (responses.length * 2) + data_len);
	var offset = 1;

	buffer.writeUInt8(buffer.length - 1, 0);

	for (var i = 0; i < responses.length; i++) {
		buffer.writeUInt8(1 + (responses[i].length * 2), offset);
		buffer.writeUInt8(0x06, offset + 1);

		offset += 2;

		for (var j = 0; j < responses[i].length; j++) {
			responses[i][j].copy(buffer, offset, 0, 2);

			offset += 2;
		}
	}

	return buffer;
};

exports.parseResponse = function (buffer) {
	if (buffer.length === 0) return null;

	var responses = [];
	var len       = buffer.readUInt8(0);
	var offset    = 1;

	while (offset < len) {
		var total     = (buffer.readUInt8(offset) - 1) / 2;
		var registers = [];

		offset += 2;

		for (var i = 0; i < total; i++) {
			registers.push(buffer.slice(offset, offset + 2));

			offset += 2;
		}

		responses.push(registers);
	}

	return responses;
};
