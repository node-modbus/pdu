var assert = require("assert");
var Help   = require("../help");

describe("Invalid data", function () {
	it("should return null and not throw", function () {
		assert.equal(
			null,
			Help.modbus.ReadCoils.Request.parse(new Buffer([ 0x03, 0x04 ]))
		);
		assert.equal(
			null,
			Help.modbus.ReadInputRegisters.Request.parse(new Buffer([ 0x07, 0x04, 0x84 ]))
		);
	});
});
