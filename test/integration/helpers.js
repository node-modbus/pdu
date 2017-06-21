var assert = require("assert");
var Help   = require("../help");

describe("Helpers", function () {
	it("blocksToBuffer", function () {
		assert.deepEqual(
			Help.modbus.Helpers.blocksToBuffer([ new Buffer([ 0x01, 0x02 ]), new Buffer([ 0x03, 0x04 ]) ]),
			new Buffer([ 0x04, 0x01, 0x02, 0x03, 0x04 ])
		);

		assert.deepEqual(
			Help.modbus.Helpers.blocksToBuffer([ new Buffer([ 0x01, 0x02 ]), new Buffer([ 0x03 ]) ]),
			new Buffer([ 0x04, 0x01, 0x02, 0x03, 0x00 ])
		);

		assert.deepEqual(
			Help.modbus.Helpers.blocksToBuffer([]),
			new Buffer([ 0x00 ])
		);

		assert.throws(
			function () {
				Help.modbus.Helpers.blocksToBuffer();
			},
			/undefined/
		);
	});

	it("bitsToBuffer", function () {
		assert.deepEqual(
			Help.modbus.Helpers.bitsToBuffer([ 1, 1, 0, 1 ]),
			new Buffer([ 0x01, 0x0B ])
		);

		assert.deepEqual(
			Help.modbus.Helpers.bitsToBuffer([ 1, 1, 0, 1, 1, 0, 1, 0 ]),
			new Buffer([ 0x01, 0x5B ])
		);

		assert.deepEqual(
			Help.modbus.Helpers.bitsToBuffer([ 1, 1, 0, 1, 1, 0, 1, 0, 1 ]),
			new Buffer([ 0x02, 0x5B, 0x01 ])
		);
	});

	it("bufferToBlocks", function () {
		assert.deepEqual(
			Help.modbus.Helpers.bufferToBlocks(new Buffer([ 0x04, 0x01, 0x02, 0x03, 0x04 ])),
			[ new Buffer([ 0x01, 0x02 ]), new Buffer([ 0x03, 0x04 ]) ]
		);

		assert.deepEqual(
			Help.modbus.Helpers.bufferToBlocks(new Buffer([ 0x00 ])),
			[]
		);

		assert.throws(
			function () {
				Help.modbus.Helpers.bufferToBlocks();
			},
			/undefined/
		);
	});

	it("bufferToBits", function () {
		assert.deepEqual(
			Help.modbus.Helpers.bufferToBits(new Buffer([ 0x01, 0x0B ])),
			[ 1, 1, 0, 1, 0, 0, 0, 0 ]
		);

		assert.deepEqual(
			Help.modbus.Helpers.bufferToBits(new Buffer([ 0x01, 0x5B ])),
			[ 1, 1, 0, 1, 1, 0, 1, 0 ]
		);

		assert.deepEqual(
			Help.modbus.Helpers.bufferToBits(new Buffer([ 0x02, 0x5B, 0x01 ])),
			[ 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0 ]
		);
	});
});
