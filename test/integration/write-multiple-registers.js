var assert = require("assert");
var Help   = require("../help");

describe("Write Multiple Registers", function () {
	it("should be [ start, end, blocks ] => [ start, end ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var start  = Math.round(Math.random() * 100);
			var end    = start + 10 - 1;
			var blocks = Help.randomBlockList(5, 2);

			assert.deepEqual(
				{ start : start, end : end, values : blocks },
				Help.modbus.writeMultipleRegisters.request.parse(
					Help.modbus.writeMultipleRegisters.request.build(start, end, blocks).slice(1)
				)
			);
			assert.deepEqual(
				{ start : start, end : end },
				Help.modbus.writeMultipleRegisters.response.parse(
					Help.modbus.writeMultipleRegisters.response.build(start, end).slice(1)
				)
			);
		}
	});
});
