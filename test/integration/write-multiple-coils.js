var assert = require("assert");
var Help   = require("../help");

describe("Write Multiple Coils", function () {
	it("should be [ start, end, bits ] => [ start, end ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var start = Math.round(Math.random() * 100);
			var end   = start + 13 - 1;
			var bits  = Help.randomBitList(13);

			assert.deepEqual(
				{ start : start, end : end, values : bits },
				Help.modbus.writeMultipleCoils.request.parse(
					Help.modbus.writeMultipleCoils.request.build(start, end, bits).slice(1)
				)
			);
			assert.deepEqual(
				{ start : start, end : end },
				Help.modbus.writeMultipleCoils.response.parse(
					Help.modbus.writeMultipleCoils.response.build(start, end).slice(1)
				)
			);
		}
	});
});
