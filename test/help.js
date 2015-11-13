var assert = require("assert");
var modbus = require("..");

exports.modbus = modbus;
exports.trials = 100;

exports.startEndAddress = function startEndAddress(fc, start, end) {
	var buffer = new Buffer(5);

	buffer.writeUInt8(fc, 0);
	buffer.writeUInt16BE(start, 1);
	buffer.writeUInt16BE(end - start + 1, 3);

	return buffer;
};

exports.addressValue = function addressValue(fc, address, blocks) {
	var buffer = new Buffer(3 + (blocks.length * 2));

	buffer.writeUInt8(fc, 0);
	buffer.writeUInt16BE(address, 1);

	for (var i = 0; i < blocks.length; i++) {
		blocks[i].copy(buffer, 3 + (i * 2), 0, 2);
	}

	return buffer;
};

exports.randomBitList = function randomBitList(len) {
	var bits = [];

	for (var j = 0; j < len; j++) {
		bits.push(Math.random() > .5 ? 1 : 0);
	}

	while (bits.length % 8 > 0) {
		bits.push(0);
	}

	return bits;
};

exports.randomBlockList = function randomBlockList(len, block_len) {
	var blocks = [];

	for (var j = 0; j < len; j++) {
		blocks.push(this.randomBlock(block_len));
	}

	return blocks;
};

exports.randomBlock = function randomBlock(len) {
	var buffer = new Buffer(len);

	for (var i = 0; i < buffer.length; i++) {
		buffer[i] = Math.round(Math.random() * 255);
	}

	return buffer;
};
