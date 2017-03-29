var Helpers = require("../Helpers");

exports.code = 0x18;

exports.buildRequest = function (address) {
	var buffer = Buffer.alloc(2);

	buffer.writeUInt16BE(address, 0);

	return buffer;
};

exports.parseRequest = function (buffer) {
	return {
		address : buffer.readUInt16BE(0)
	};
};

exports.buildResponse = function (registers) {
	var buffer = Buffer.alloc(4 + (registers.length * 2));

	buffer.writeUInt16BE(buffer.length - 2, 0);
	buffer.writeUInt16BE(registers.length, 2);

	for (var i = 0; i < registers.length; i++) {
		registers[i].copy(buffer, 4 + (i * 2), 0, 2);
	}

	return buffer;
};

exports.parseResponse = function (buffer) {
	var total     = buffer.readUInt16BE(2);
	var registers = [];
	var offset    = 4;

	for (var i = 0; i < total; i++) {
		registers.push(buffer.slice(offset, offset + 2));

		offset += 2;
	}

	return registers;
};
