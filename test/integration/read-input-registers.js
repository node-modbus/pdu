var assert = require("assert");
var Help   = require("../help");

describe("Read Input Registers", function () {
	it("should be [ start, end ] => [ buffer block, buffer block, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var start  = Math.round(Math.random() * 100);
			var end    = start + Math.round(Math.random() * 100);
			var blocks = Help.randomBlockList(end - start + 1, 2);

			assert.deepEqual(
				{ start : start, end : end },
				Help.modbus.readInputRegisters.request.parse(
					Help.modbus.readInputRegisters.request.build(start, end).slice(1)
				)
			);
			assert.deepEqual(
				blocks,
				Help.modbus.readInputRegisters.response.parse(
					Help.modbus.readInputRegisters.response.build(blocks).slice(1)
				)
			);
		}
	});
});
