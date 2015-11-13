var assert = require("assert");
var Help   = require("../help");

describe("Read Holding Registers", function () {
	it("should be [ start, end ] => [ buffer block, buffer block, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var start  = Math.round(Math.random() * 100);
			var end    = start + Math.round(Math.random() * 100);
			var blocks = Help.randomBlockList(end - start + 1, 2);

			assert.deepEqual(
				{ start : start, end : end },
				Help.modbus.readHoldingRegisters.request.parse(
					Help.modbus.readHoldingRegisters.request.build(start, end)
				)
			);
			assert.deepEqual(
				blocks,
				Help.modbus.readHoldingRegisters.response.parse(
					Help.modbus.readHoldingRegisters.response.build(blocks)
				)
			);
		}
	});
});
