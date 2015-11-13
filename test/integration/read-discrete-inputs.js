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
				Help.modbus.readDiscreteInputs.request.parse(
					Help.modbus.readDiscreteInputs.request.build(start, end)
				)
			);
			assert.deepEqual(
				bits,
				Help.modbus.readDiscreteInputs.response.parse(
					Help.modbus.readDiscreteInputs.response.build(bits)
				)
			);
		}
	});
});
