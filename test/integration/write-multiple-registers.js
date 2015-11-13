var assert = require("assert");
var Help   = require("../help");

describe("Write Multiple Registers", function () {
	it("should be [ start, end, blocks ] => [ start, end ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var start  = Math.round(Math.random() * 100);
			var end    = start + 10 - 1;
			var blocks = Help.randomBlockList(5, 2);
			var buf1   = Help.modbus.writeMultipleRegisters.request.build(start, end, blocks);
			var buf2   = Help.startEndValues(Help.modbus.writeMultipleRegisters.code, start, end, blocks);
			var buf3   = Help.modbus.writeMultipleRegisters.response.build(start, end);

			assert.deepEqual(buf1, buf2);
			assert.deepEqual({ start : start, end : end }, Help.modbus.writeMultipleRegisters.response.parse(buf3.slice(1)));
		}
	});
});
