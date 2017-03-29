var assert = require("assert");
var Help   = require("../help");

describe("Write Multiple Coils", function () {
	it("should be [ start, end, bits ] => [ start, end ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address = Math.round(Math.random() * 100);
			var bits    = Help.randomBitList(13);

			assert.deepEqual(
				{ address : address, quantity: bits.length, values : bits },
				Help.modbus.WriteMultipleCoils.Request.parse(
					Help.modbus.WriteMultipleCoils.Request.build(address, bits)
				)
			);
			assert.deepEqual(
				{ address : address, quantity : bits.length },
				Help.modbus.WriteMultipleCoils.Response.parse(
					Help.modbus.WriteMultipleCoils.Response.build(address, bits.length)
				)
			);
		}
	});
});
