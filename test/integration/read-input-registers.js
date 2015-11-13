var assert = require("assert");
var Help   = require("../help");

describe("Read Input Registers", function () {
	it("should be [ start, end ] => [ buffer block, buffer block, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var start = Math.round(Math.random() * 100);
			var end   = start + Math.round(Math.random() * 100);
			var buf1  = Help.modbus.readInputRegisters.request(start, end);
			var buf2  = Help.startEndAddress(Help.modbus.readInputRegisters.code, start, end);
			var bits  = Help.randomBlockList(end - start + 1, 2);
			var buf3  = Help.modbus.readInputRegisters.response(bits);

			assert.deepEqual(buf1, buf2);
			assert.deepEqual(bits, Help.modbus.readInputRegisters.parse(buf3.slice(1)));
		}
	});
});
