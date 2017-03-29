var Helpers = require("../Helpers");

exports.code = 0x10;

exports.buildRequest = function (address, values) {
	var buffer = Buffer.alloc(5 + (values.length * 2));

	buffer.writeUInt16BE(address, 0);
	buffer.writeUInt16BE(values.length, 2);
	buffer.writeUInt8(values.length * 2, 4);

	for (var i = 0; i < values.length; i++) {
		values[i].copy(buffer, 5 + (i * 2), 0, 2);
	}

	return buffer;
};
exports.parseRequest = function (buffer) {
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
