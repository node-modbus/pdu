var assert = require("assert");
var Help   = require("../help");

describe("Read Coils", function () {
	it("should be [ address, quantity ] => [ bit, bit, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address = Math.round(Math.random() * 100);
			var bits    = Help.randomBitList(10 + Math.round(Math.random() * 10));

			assert.deepEqual(
				{ address : address, quantity : bits.length },
				Help.modbus.ReadCoils.Request.parse(
					Help.modbus.ReadCoils.Request.build(address, bits.length)
				)
			);
			assert.deepEqual(
				bits,
				Help.modbus.ReadCoils.Response.parse(
					Help.modbus.ReadCoils.Response.build(bits)
				)
			);
		}
	});
});
