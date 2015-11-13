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
				Help.modbus.WriteMultipleCoils.Request.parse(
					Help.modbus.WriteMultipleCoils.Request.build(start, end, bits)
				)
			);
			assert.deepEqual(
				{ start : start, end : end },
				Help.modbus.WriteMultipleCoils.Response.parse(
					Help.modbus.WriteMultipleCoils.Response.build(start, end)
				)
			);
		}
	});
});
