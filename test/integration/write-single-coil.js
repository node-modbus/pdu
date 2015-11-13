var assert = require("assert");
var Help   = require("../help");

describe("Write Single Coil", function () {
	it("should be [ address, value ] => [ address, value ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address = Math.round(Math.random() * 100);
			var value   = (Math.random() > .5 ? 1 : 0);

			assert.deepEqual(
				{ address : address, value : value },
				Help.modbus.WriteSingleCoil.Request.parse(
					Help.modbus.WriteSingleCoil.Request.build(address, value)
				)
			);
			assert.deepEqual(
				{ address : address, value : value },
				Help.modbus.WriteSingleCoil.Response.parse(
					Help.modbus.WriteSingleCoil.Response.build(address, value)
				)
			);
		}
	});
});
