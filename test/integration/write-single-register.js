var assert = require("assert");
var Help   = require("../help");

describe("Write Single Register", function () {
	it("should be [ address, block ] => [ address, block ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var addr  = Math.round(Math.random() * 100);
			var block = Help.randomBlock(2);
			var buf1  = Help.modbus.writeSingleRegister.request(addr, block);
			var buf2  = Help.addressValue(Help.modbus.writeSingleRegister.code, addr, [ block ]);
			var buf3  = Help.modbus.writeSingleRegister.response(addr, block);

			assert.deepEqual(buf1, buf2);
			assert.deepEqual({ address : addr, value : block }, Help.modbus.writeSingleRegister.parse(buf3.slice(1)));
		}
	});
});
