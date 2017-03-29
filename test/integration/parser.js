var assert = require("assert");
var Help   = require("../help");

describe("Generic parser", function () {
	it("should support requests", function () {
		assert.deepEqual(
			Help.modbus.Request(new Buffer([ 0x01, 0x00, 0x0a, 0x00, 0x40 ])),
			{ code: "ReadCoils", address: 10, quantity: 64 }
		);

		assert.deepEqual(
			Help.modbus.Request(new Buffer([ 0x0F, 0x00, 0x13, 0x00, 0x0A, 0x02, 0xCD, 0x01 ])),
			{ code: "WriteMultipleCoils", address: 19, quantity: 10, values: [ 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0 ] }
		);
	});

	it("should support responses", function () {
		assert.deepEqual(
			Help.modbus.Response(new Buffer([ 0x81, 0x01 ])),
			{ code: "ReadCoils", exception: "IllegalFunction" }
		);

		assert.deepEqual(
			Help.modbus.Response(new Buffer([ 0x01, 0x03, 0x04, 0x02, 0xCD ])),
			{ code: "ReadCoils", data: [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1 ] }
		);
	});
});
