var assert = require("assert");
var Help   = require("../help");

describe("Read Discrete Inputs", function () {
	it("should be [ address, quantity ] => [ bit, bit, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address = Math.round(Math.random() * 100);
			var bits    = Help.randomBitList(10 + Math.round(Math.random() * 4000));

			assert.deepEqual(
				{ address : address, quantity : bits.length },
				Help.modbus.ReadDiscreteInputs.Request.parse(
					Help.modbus.ReadDiscreteInputs.Request.build(address, bits.length)
				)
			);

			if (bits.length > 2040) {
				assert.throws(
					function () {
						Help.modbus.ReadDiscreteInputs.Response.build(bits)
					},
					/(out of bounds|RangeError)/
				);
			} else {
				assert.deepEqual(
					bits,
					Help.modbus.ReadDiscreteInputs.Response.parse(
						Help.modbus.ReadDiscreteInputs.Response.build(bits)
					)
				);
			}
		}
	});
});
