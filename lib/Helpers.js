exports.buildStartEndAddress = function buildStartEndAddress(start, end) {
	var buffer = Buffer.alloc(4);

	buffer.writeUInt16BE(start, 0);
	buffer.writeUInt16BE(end - start + 1, 2);

	return buffer;
};

exports.buildAddressQuantity = function buildAddressQuantity(address, quantity) {
	var buffer = Buffer.alloc(4);

	buffer.writeUInt16BE(address, 0);
	buffer.writeUInt16BE(quantity, 2);

	return buffer;
};

exports.parseStartEndAddress = function parseStartEndAddress(buffer) {
	return {
		start : buffer.readUInt16BE(0),
		end   : buffer.readUInt16BE(0) + buffer.readUInt16BE(2) - 1
	};
};

exports.parseAddressQuantity = function parseAddressQuantity(buffer) {
	return {
		address  : buffer.readUInt16BE(0),
		quantity : buffer.readUInt16BE(2)
	};
};

exports.parseAddressValue = function parseAddressValue(buffer) {
	return {
		address : buffer.readUInt16BE(0),
		value   : buffer.slice(2, 4)
	};
};

exports.bitsToBuffer = function bitsToBuffer(bits) {
	var buffer = Buffer.alloc(Math.ceil(bits.length / 8) + 1);
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
	var buffer = Buffer.alloc((blocks.length * 2) + 1);

	buffer.writeUInt8(blocks.length * 2, 0);

	for (var i = 0; i < blocks.length; i++) {
		blocks[i].copy(buffer, (i * 2) + 1, 0, 2);
	}

	return buffer;
};

exports.bufferToBits = function bufferToBits(buffer) {
	var bits = [];

	for (var i = 1; i < Math.min(buffer.length, buffer[0] + 1); i++) {
		for (var j = 0; j < 8; j++) {
			bits.push((buffer[i] >> j) & 0x1);
		}
	}

	return bits;
};

exports.bufferToBlocks = function bufferToBlocks(buffer) {
	var total  = buffer.readUInt8(0) / 2;
	var blocks = [];

	for (var i = 0; i < total; i++) {
		blocks.push(Buffer.from([ buffer[(i * 2) + 1], buffer[(i * 2) + 2] ]));
	}

	return blocks;
};
