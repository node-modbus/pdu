var Helpers = require("../Helpers");
var Buff    = require("../Buffer");

exports.code = 0x06;

exports.buildRequest = function (address, value) {
	var buffer = Buff.alloc(4);

	buffer.writeUInt16BE(address, 0);
	value.copy(buffer, 2, 0, 2);

	return buffer;
};
exports.parseRequest = Helpers.parseAddressValue;

exports.buildResponse = exports.buildRequest;
exports.parseResponse = Helpers.parseAddressValue;
