var assert = require("assert");
var Help   = require("../help");

describe("Read Holding Registers", function () {
	it("should be [ address, quantity ] => [ buffer block, buffer block, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address  = Math.round(Math.random() * 100);
			var blocks = Help.randomBlockList(10 + Math.round(Math.random() * 500), 2);

			assert.deepEqual(
				{ address : address, quantity : blocks.length },
				Help.modbus.ReadHoldingRegisters.Request.parse(
					Help.modbus.ReadHoldingRegisters.Request.build(address, blocks.length)
				)
			);

			if (blocks.length > 127) {
				assert.throws(
					function () {
						Help.modbus.ReadHoldingRegisters.Response.build(blocks)
					},
					/(out of bounds|RangeError)/
				);
			} else {
				assert.deepEqual(
					blocks,
					Help.modbus.ReadHoldingRegisters.Response.parse(
						Help.modbus.ReadHoldingRegisters.Response.build(blocks)
					)
				);
			}
		}
	});

	it("should be [ address, quantity ] => buffer", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address = Math.round(Math.random() * 100);
			var blocks  = Help.randomBlock(7);

			assert.deepEqual(
				{ address : address, quantity : blocks.length },
				Help.modbus.ReadHoldingRegisters.Request.parse(
					Help.modbus.ReadHoldingRegisters.Request.build(address, blocks.length)
				)
			);
		}
	});
});
