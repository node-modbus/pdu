var assert = require("assert");
var Help   = require("../help");

describe("Write Multiple Registers", function () {
	it("should be [ start, end, blocks ] => [ start, end ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address = Math.round(Math.random() * 100);
			var blocks  = Help.randomBlockList(5, 2);

			assert.deepEqual(
				{ address : address, quantity : blocks.length, values : blocks },
				Help.modbus.WriteMultipleRegisters.Request.parse(
					Help.modbus.WriteMultipleRegisters.Request.build(address, blocks)
				)
			);
			assert.deepEqual(
				{ address : address, quantity : blocks.length },
				Help.modbus.WriteMultipleRegisters.Response.parse(
					Help.modbus.WriteMultipleRegisters.Response.build(address, blocks.length)
				)
			);
		}
	});
});
