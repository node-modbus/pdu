var assert = require("assert");
var Help   = require("../help");

describe("Write Single Register", function () {
	it("should be [ address, block ] => [ address, block ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address = Math.round(Math.random() * 100);
			var value   = Help.randomBlock(2);

			assert.deepEqual(
				{ address : address, value : value },
				Help.modbus.WriteSingleRegister.Request.parse(
					Help.modbus.WriteSingleRegister.Request.build(address, value)
				)
			);
			assert.deepEqual(
				{ address : address, value : value },
				Help.modbus.WriteSingleRegister.Response.parse(
					Help.modbus.WriteSingleRegister.Response.build(address, value)
				)
			);
		}
	});
});
