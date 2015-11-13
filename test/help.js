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

exports.startEndValues = function startEndValues(fc, start, end, values) {
	var buffer = new Buffer(6 + values.reduce(function (total, value) { return total + value.length }, 0));

	buffer.writeUInt8(fc, 0);
	buffer.writeUInt16BE(start, 1);
	buffer.writeUInt16BE(end - start + 1, 3);
	buffer.writeUInt8(buffer.length - 6, 5);

	var offset = 6;

	values.map(function (value) {
		value.copy(buffer, offset);
		offset += value.length;
	});

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

exports.bitsToBuffer = function bitsToBuffer(bits) {
	var buffer = new Buffer(Math.ceil(bits.length / 8) + 1);
	var i;

	buffer.fill(0x00);
	buffer[0] = buffer.length - 1;

	for (var index = 0; index < bits.length; index++) {
		i = Math.floor(index / 8) + 1;

		buffer[i] >>= 1;
		if (bits[index]) {
			buffer[i] |= 0x80;
		}
	}

	i = bits.length - (Math.floor(bits.length / 8) * 8);
	if (i > 0) {
		i = 8 - i;
		while (i > 0) {
			buffer[buffer.length - 1] >>= 1;
			i -= 1;
		}
	}

	return buffer;
};
