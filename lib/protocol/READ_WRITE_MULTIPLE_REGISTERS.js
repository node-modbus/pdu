var Helpers = require("../Helpers");
var Buff    = require("../Buffer");

exports.code = 0x17;

exports.buildRequest = function (read_address, read_quantity, write_address, values) {
	var buffer = Buff.alloc(9 + (values.length * 2));

	buffer.writeUInt16BE(read_address, 0);
	buffer.writeUInt16BE(read_quantity, 2);
	buffer.writeUInt16BE(write_address, 4);
	buffer.writeUInt16BE(values.length, 6);
	buffer.writeUInt8(values.length * 2, 8);

	Helpers.copyBufferBlocks(buffer, values, 9);

	return buffer;
};
exports.parseRequest = function (buffer) {
	if (buffer.length < 8) return null;

	var blocks = buffer.readUInt8(8) / 2;
	var data   = {
		read_address  : buffer.readUInt16BE(0),
		read_quantity : buffer.readUInt16BE(2),
		write_address : buffer.readUInt16BE(4),
		values        : []
	};

	for (var i = 0; i < blocks; i++) {
		data.values.push(buffer.slice(9 + (i * 2), 11 + (i * 2)));
	}

	return data;
};

exports.buildResponse = function (values) {
	var buffer = Buff.alloc(values.length * 2 + 1);

	buffer.writeUInt8(values.length * 2, 0);

	Helpers.copyBufferBlocks(buffer, values, 1);

	return buffer;
};

exports.parseResponse = function (buffer) {
	if (buffer.length === 0) return null;

	var blocks = buffer.readUInt8(0) / 2;
	var values = [];

	for (var i = 0; i < blocks; i++) {
		values.push(buffer.slice(1 + (i * 2), 3 + (i * 2)));
	}

	return { values: values };
};
