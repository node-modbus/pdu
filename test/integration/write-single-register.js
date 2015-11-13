var assert = require("assert");
var Help   = require("../help");

describe("Write Single Register", function () {
	it("should be [ address, block ] => [ address, block ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address = Math.round(Math.random() * 100);
			var value   = Help.randomBlock(2);

			assert.deepEqual(
				{ address : address, value : value },
				Help.modbus.writeSingleRegister.request.parse(
					Help.modbus.writeSingleRegister.request.build(address, value).slice(1)
				)
			);
			assert.deepEqual(
				{ address : address, value : value },
				Help.modbus.writeSingleRegister.response.parse(
					Help.modbus.writeSingleRegister.response.build(address, value).slice(1)
				)
			);
		}
	});
});
