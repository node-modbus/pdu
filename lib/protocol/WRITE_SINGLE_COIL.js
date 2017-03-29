var Helpers = require("../Helpers");

exports.code = 0x05;

exports.buildRequest = function (address, value) {
	var buffer = Buffer.alloc(4);

	buffer.writeUInt16BE(address, 0);

	buffer[2] = (value ? 0xFF : 0x00);
	buffer[3] = 0x00;

	return buffer;
};

exports.parseRequest = function (buffer) {
	var data = Helpers.parseAddressValue(buffer);

	data.value = (data.value[0] == 0xFF && data.value[1] == 0x00 ? 1 : 0);

	return data;
};

exports.buildResponse = exports.buildRequest;
exports.parseResponse = exports.parseRequest;
