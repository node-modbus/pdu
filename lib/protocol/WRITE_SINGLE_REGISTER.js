var Helpers = require("../Helpers");

exports.code = 0x06;

exports.buildRequest = function (address, value) {
	var buffer = new Buffer(4);

	buffer.writeUInt16BE(address, 0);
	value.copy(buffer, 2, 0, 2);

	return buffer;
};
exports.parseRequest = Helpers.parseAddressValue;

exports.buildResponse = exports.buildRequest;
exports.parseResponse = Helpers.parseAddressValue;
