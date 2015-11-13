var assert = require("assert");
var Help   = require("../help");

describe("Write Single Coil", function () {
	it("should be [ address, value ] => [ address, value ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address = Math.round(Math.random() * 100);
			var value   = (Math.random() > .5 ? 1 : 0);

			assert.deepEqual(
				{ address : address, value : value },
				Help.modbus.writeSingleCoil.request.parse(
					Help.modbus.writeSingleCoil.request.build(address, value).slice(1)
				)
			);
			assert.deepEqual(
				{ address : address, value : value },
				Help.modbus.writeSingleCoil.response.parse(
					Help.modbus.writeSingleCoil.response.build(address, value).slice(1)
				)
			);
		}
	});
});
