exports.buildStartEndAddress = function buildStartEndAddress(start, end) {
	var buffer = new Buffer(4);

	buffer.writeUInt16BE(start, 0);
	buffer.writeUInt16BE(end - start + 1, 2);

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

exports.blocksToBuffer = function blocksToBuffer(blocks) {
	var buffer = new Buffer((blocks.length * 2) + 1);

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
		blocks.push(new Buffer([ buffer[(i * 2) + 1], buffer[(i * 2) + 2] ]));
	}

	return blocks;
};
