var assert = require("assert");
var Help   = require("../help");

describe("Write Single Coil", function () {
	it("should be [ address, value ] => [ address, value ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var addr  = Math.round(Math.random() * 100);
			var value = (Math.random() > .5 ? 1 : 0);
			var buf1  = Help.modbus.writeSingleCoil.request.build(addr, value);
			var buf2  = Help.addressValue(Help.modbus.writeSingleCoil.code, addr, [ new Buffer([ value ? 0xFF : 0x00, 0x00 ]) ]);
			var buf3  = Help.modbus.writeSingleCoil.response.build(addr, value);

			assert.deepEqual(buf1, buf2);
			assert.deepEqual({ address : addr, value : value }, Help.modbus.writeSingleCoil.response.parse(buf3.slice(1)));
		}
	});
});
