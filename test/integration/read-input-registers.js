var assert = require("assert");
var Help   = require("../help");

describe("Read Input Registers", function () {
	it("should be [ address, quantity ] => [ buffer block, buffer block, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address = Math.round(Math.random() * 100);
			var blocks  = Help.randomBlockList(10 + Math.round(Math.random() * 500), 2);

			assert.deepEqual(
				{ address : address, quantity : blocks.length },
				Help.modbus.ReadInputRegisters.Request.parse(
					Help.modbus.ReadInputRegisters.Request.build(address, blocks.length)
				)
			);

			if (blocks.length > 127) {
				assert.throws(
					function () {
						Help.modbus.ReadInputRegisters.Response.build(blocks)
					},
					/(out of bounds|RangeError)/
				);
			} else {
				assert.deepEqual(
					blocks,
					Help.modbus.ReadInputRegisters.Response.parse(
						Help.modbus.ReadInputRegisters.Response.build(blocks)
					)
				);
			}
		}
	});
});
