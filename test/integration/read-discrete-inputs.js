var assert = require("assert");
var Help   = require("../help");

describe("Read Discrete Inputs", function () {
	it("should be [ start, end ] => [ bit, bit, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var start = Math.round(Math.random() * 100);
			var end   = start + Math.round(Math.random() * 100);
			var bits  = Help.randomBitList(end - start + 1);

			assert.deepEqual(
				{ start : start, end : end },
				Help.modbus.ReadDiscreteInputs.Request.parse(
					Help.modbus.ReadDiscreteInputs.Request.build(start, end)
				)
			);
			assert.deepEqual(
				bits,
				Help.modbus.ReadDiscreteInputs.Response.parse(
					Help.modbus.ReadDiscreteInputs.Response.build(bits)
				)
			);
		}
	});
});
