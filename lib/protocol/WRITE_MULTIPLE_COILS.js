var Helpers = require("../Helpers");

exports.code = 0x0F;

exports.buildRequest = function (start, end, values) {
	var data   = Helpers.bitsToBuffer(values);
	var buffer = new Buffer(data.length + 4);

	buffer.writeUInt16BE(start, 0);
	buffer.writeUInt16BE(end - start + 1, 2);
	data.copy(buffer, 4);

	return buffer;
};
exports.parseRequest = function (buffer) {
	var data = {
		start : buffer.readUInt16BE(0)
	};

	data.end    = data.start + buffer.readUInt16BE(2) - 1;
	data.values = Helpers.bufferToBits(buffer.slice(4, 5 + buffer.readUInt8(4)));

	return data;
};

exports.buildResponse = Helpers.buildStartEndAddress;
exports.parseResponse = function (buffer) {
	return {
		start : buffer.readUInt16BE(0),
		end   : buffer.readUInt16BE(2) + buffer.readUInt16BE(0) - 1
	};
};
