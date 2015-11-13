var Helpers = require("../Helpers");

exports.code = 0x15;

exports.buildRequest = function (requests) {
	var data_len = requests.reduce(function (len, request) {
		return len + (request.values.length * 2);
	}, 0);
	var buffer = new Buffer(1 + (requests.length * 7) + data_len);
	var offset = 1;

	buffer.writeUInt8(buffer.length - 1, 0);

	for (var i = 0; i < requests.length; i++) {
		buffer.writeUInt8(0x06, offset);
		buffer.writeUInt16BE(requests[i].file, offset + 1);
		buffer.writeUInt16BE(requests[i].start, offset + 3);
		buffer.writeUInt16BE(requests[i].end - requests[i].start + 1, offset + 5);

		offset += 7;

		for (var j = 0; j < requests[i].values.length; j++) {
			requests[i].values[j].copy(buffer, offset, 0, 2);

			offset += 2;
		}
	}

	return buffer;
};
exports.parseRequest = function (buffer) {
	var len      = buffer.readUInt8(0);
	var requests = [];
	var offset   = 1;

	while (offset < len) {
		offset += 1;

		var request = {
			file   : buffer.readUInt16BE(offset),
			start  : buffer.readUInt16BE(offset + 2),
			end    : buffer.readUInt16BE(offset + 2) + buffer.readUInt16BE(offset + 4) - 1,
			values : []
		};
		var total = (request.end - request.start + 1) / 2;

		offset += 6;

		for (var i = 0; i < total; i++) {
			request.values.push(buffer.slice(offset, offset + 2));

			offset += 2;
		}

		requests.push(request);
	}

	return requests;
};

exports.buildResponse = exports.buildRequest;
exports.parseResponse = exports.parseRequest;
