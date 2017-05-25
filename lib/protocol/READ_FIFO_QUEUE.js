var Helpers = require("../Helpers");
var Buff    = require("../Buffer");

exports.code = 0x18;

exports.buildRequest = function (address) {
	var buffer = Buff.alloc(2);

	buffer.writeUInt16BE(address, 0);

	return buffer;
};

exports.parseRequest = function (buffer) {
	if (buffer.length < 2) return null;

	return {
		address : buffer.readUInt16BE(0)
	};
};

exports.buildResponse = function (registers) {
	var buffer = Buff.alloc(4 + (registers.length * 2));

	buffer.writeUInt16BE(buffer.length - 2, 0);
	buffer.writeUInt16BE(registers.length, 2);

	Helpers.copyBufferBlocks(buffer, registers, 4);

	return buffer;
};

exports.parseResponse = function (buffer) {
	if (buffer.length < 4) return null;

	var total     = buffer.readUInt16BE(2);
	var registers = [];
	var offset    = 4;

	for (var i = 0; i < total; i++) {
		registers.push(buffer.slice(offset, offset + 2));

		offset += 2;
	}

	return registers;
};
