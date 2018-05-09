var Buff = require("./Buffer");

exports.buildStartEndAddress = function buildStartEndAddress(start, end) {
	var buffer = Buff.alloc(4);

	buffer.writeUInt16BE(start, 0);
	buffer.writeUInt16BE(end - start + 1, 2);

	return buffer;
};

exports.buildAddressQuantity = function buildAddressQuantity(address, quantity) {
	var buffer = Buff.alloc(4);

	buffer.writeUInt16BE(address, 0);
	buffer.writeUInt16BE(quantity, 2);

	return buffer;
};

exports.buildEmpty = function buildEmpty() {
	return Buff.alloc(0);
};

exports.parseStartEndAddress = function parseStartEndAddress(buffer) {
	if (buffer.length < 4) return null;

	return {
		start : buffer.readUInt16BE(0),
		end   : buffer.readUInt16BE(0) + buffer.readUInt16BE(2) - 1
	};
};

exports.parseAddressQuantity = function parseAddressQuantity(buffer) {
	if (buffer.length < 4) return null;

	return {
		address  : buffer.readUInt16BE(0),
		quantity : buffer.readUInt16BE(2)
	};
};

exports.parseAddressValue = function parseAddressValue(buffer) {
	if (buffer.length < 4) return null;

	return {
		address : buffer.readUInt16BE(0),
		value   : buffer.slice(2, 4)
	};
};

exports.parseEmpty = function parseEmpty() {
	return {};
};

exports.numberToBuffer = function numberToBuffer(number) {
	if (number instanceof Buffer) {
		return number;
	}

	var buffer = Buff.alloc(2);

	buffer.writeUInt16BE(number, 0);

	return buffer;
}

exports.bitsToBuffer = function bitsToBuffer(bits) {
	if (bits == null || bits.length > 2040) {
		throw new Error("Buffer overflow, bit length is out of bounds");
	}

	var buffer = Buff.alloc(Math.ceil(bits.length / 8) + 1);
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

exports.blocksToBuffer = function blocksToBuffer(blocks) {
	if (Buffer.isBuffer(blocks)) {
		var buffer = Buff.alloc(blocks.length + 1);

		buffer[0] = blocks.length;

		blocks.copy(buffer, 1);

		return buffer;
	}

	var buffer = Buff.alloc((blocks.length * 2) + 1);

	buffer.writeUInt8(blocks.length * 2, 0);

	for (var i = 0; i < blocks.length; i++) {
		if (blocks[i].length < 2) {
			buffer[(i * 2) + 1] = 0;
			buffer[(i * 2) + 2] = 0;
		}

		blocks[i].copy(buffer, (i * 2) + 1, 0, 2);
	}

	return buffer;
};

exports.bufferToBits = function bufferToBits(buffer) {
	var bits = [];

	for (var i = 1; i < Math.min(buffer.length, buffer[0] + 1); i++) {
		for (var j = 0; j < 8; j++) {
			bits.push((buffer[i] & (1 << j)) ? 1 : 0);
		}
	}

	return bits;
};

exports.bufferToBlocks = function bufferToBlocks(buffer) {
	if (buffer.length === 0) return null;

	var total  = buffer.readUInt8(0) / 2;
	var blocks = [];

	for (var i = 0; i < total; i++) {
		blocks.push(Buff.from([ buffer[(i * 2) + 1], buffer[(i * 2) + 2] ]));
	}

	return blocks;
};

exports.copyBufferBlocks = function copyBufferBlocks(buffer, values, offset) {
	for (var i = 0; i < values.length; i++) {
		values[i].copy(buffer, offset + (i * 2), 0, 2);
	}
};
