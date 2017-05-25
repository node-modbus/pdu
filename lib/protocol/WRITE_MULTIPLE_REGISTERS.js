var Helpers = require("../Helpers");
var Buff    = require("../Buffer");

exports.code = 0x10;

exports.buildRequest = function (address, values) {
	var buffer = Buff.alloc(5 + (values.length * 2));

	buffer.writeUInt16BE(address, 0);
	buffer.writeUInt16BE(values.length, 2);
	buffer.writeUInt8(values.length * 2, 4);

	Helpers.copyBufferBlocks(buffer, values, 5);

	return buffer;
};
exports.parseRequest = function (buffer) {
	if (buffer.length < 5) return null;

	var data = {
		address  : buffer.readUInt16BE(0),
		quantity : buffer.readUInt16BE(2),
		values   : []
	};

	var blocks = buffer.readUInt8(4) / 2;

	for (var i = 0; i < blocks; i++) {
		data.values.push(buffer.slice(5 + (i * 2), 7 + (i * 2)));
	}

	return data;
};

exports.buildResponse = Helpers.buildAddressQuantity;
exports.parseResponse = Helpers.parseAddressQuantity;
