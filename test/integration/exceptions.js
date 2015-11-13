var assert = require("assert");
var Help   = require("../help");

describe("Exceptions", function () {
	it("should allow alls functions and codes", function () {
		assert.deepEqual(
			new Buffer([ 0x81, 0x01 ]),
			Help.modbus.readCoils.exception.build(Help.modbus.Exceptions.ILLEGAL_FUNCTION)
		);
		assert.deepEqual(
			new Buffer([ 0x82, 0x02 ]),
			Help.modbus.readDiscreteInputs.exception.build(Help.modbus.Exceptions.ILLEGAL_DATA_ADDRESS)
		);
		assert.deepEqual(
			new Buffer([ 0x94, 0x03 ]),
			Help.modbus.readFileRecord.exception.build(Help.modbus.Exceptions.ILLEGAL_DATA_VALUE)
		);
		assert.deepEqual(
			new Buffer([ 0x83, 0x04 ]),
			Help.modbus.readHoldingRegisters.exception.build(Help.modbus.Exceptions.SLAVE_DEVICE_FAILURE)
		);
		assert.deepEqual(
			new Buffer([ 0x84, 0x05 ]),
			Help.modbus.readInputRegisters.exception.build(Help.modbus.Exceptions.ACKNOWLEDGE)
		);
		assert.deepEqual(
			new Buffer([ 0x95, 0x06 ]),
			Help.modbus.writeFileRecord.exception.build(Help.modbus.Exceptions.SLAVE_DEVICE_BUSY)
		);
		assert.deepEqual(
			new Buffer([ 0x8F, 0x07 ]),
			Help.modbus.writeMultipleCoils.exception.build(Help.modbus.Exceptions.NEGATIVE_ACKNOWLEDGE)
		);
		assert.deepEqual(
			new Buffer([ 0x90, 0x08 ]),
			Help.modbus.writeMultipleRegisters.exception.build(Help.modbus.Exceptions.MEMORY_PARITY_ERROR)
		);
		assert.deepEqual(
			new Buffer([ 0x85, 0x0A ]),
			Help.modbus.writeSingleCoil.exception.build(Help.modbus.Exceptions.GATEWAY_PATH_UNAVAILABLE)
		);
		assert.deepEqual(
			new Buffer([ 0x86, 0x0B ]),
			Help.modbus.writeSingleRegister.exception.build(Help.modbus.Exceptions.GATEWAY_TARGET_DEVICE_FAILED_TO_RESPOND)
		);
	});

	it("should parse buffers with function code and exception", function () {
		assert.deepEqual(
			{ code: "readCoils", exception: "ILLEGAL_FUNCTION" },
			Help.modbus.Exceptions.parse(new Buffer([ 0x81, 0x01 ]))
		);
		assert.deepEqual(
			{ code: "writeSingleCoil", exception: "SLAVE_DEVICE_FAILURE" },
			Help.modbus.Exceptions.parse(new Buffer([ 0x85, 0x04 ]))
		);
		assert.deepEqual(
			{ code: "writeFileRecord", exception: "GATEWAY_TARGET_DEVICE_FAILED_TO_RESPOND" },
			Help.modbus.Exceptions.parse(new Buffer([ 0x95, 0x0B ]))
		);
	});
});
