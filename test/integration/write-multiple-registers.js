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
				Help.modbus.WriteMultipleRegisters.Request.parse(
					Help.modbus.WriteMultipleRegisters.Request.build(start, end, blocks)
				)
			);
			assert.deepEqual(
				{ start : start, end : end },
				Help.modbus.WriteMultipleRegisters.Response.parse(
					Help.modbus.WriteMultipleRegisters.Response.build(start, end)
				)
			);
		}
	});
});
