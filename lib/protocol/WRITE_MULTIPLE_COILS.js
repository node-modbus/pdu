var Helpers = require("../Helpers");
var Buff    = require("../Buffer");

exports.code = 0x0F;

exports.buildRequest = function (address, values) {
	var data   = Helpers.bitsToBuffer(values);
	var buffer = Buff.alloc(data.length + 4);

	buffer.writeUInt16BE(address, 0);
	buffer.writeUInt16BE(values.length, 2);
	data.copy(buffer, 4);

	return buffer;
};
exports.parseRequest = function (buffer) {
	if (buffer.length < 5) return null;

	return {
		address  : buffer.readUInt16BE(0),
		quantity : buffer.readUInt16BE(2),
		values   : Helpers.bufferToBits(buffer.slice(4, 5 + buffer.readUInt8(4)))
	};
};

exports.buildResponse = Helpers.buildAddressQuantity;
exports.parseResponse = Helpers.parseAddressQuantity;
