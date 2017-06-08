var assert = require("assert");
var Help   = require("../help");

describe("Exceptions", function () {
	it("should allow alls functions and codes", function () {
		assert.deepEqual(
			new Buffer([ 0x81, 0x01 ]),
			Help.modbus.ReadCoils.Exception.build(Help.modbus.Exception.IllegalFunction)
		);
		assert.deepEqual(
			new Buffer([ 0x82, 0x02 ]),
			Help.modbus.ReadDiscreteInputs.Exception.build(Help.modbus.Exception.IllegalDataAddress)
		);
		assert.deepEqual(
			new Buffer([ 0x94, 0x03 ]),
			Help.modbus.ReadFileRecord.Exception.build(Help.modbus.Exception.IllegalDataValue)
		);
		assert.deepEqual(
			new Buffer([ 0x83, 0x04 ]),
			Help.modbus.ReadHoldingRegisters.Exception.build(Help.modbus.Exception.ServerDeviceFailure)
		);
		assert.deepEqual(
			new Buffer([ 0x84, 0x05 ]),
			Help.modbus.ReadInputRegisters.Exception.build(Help.modbus.Exception.Aknowledge)
		);
		assert.deepEqual(
			new Buffer([ 0x95, 0x06 ]),
			Help.modbus.WriteFileRecord.Exception.build(Help.modbus.Exception.ServerDeviceBusy)
		);
		assert.deepEqual(
			new Buffer([ 0x90, 0x08 ]),
			Help.modbus.WriteMultipleRegisters.Exception.build(Help.modbus.Exception.MemoryParityError)
		);
		assert.deepEqual(
			new Buffer([ 0x85, 0x0A ]),
			Help.modbus.WriteSingleCoil.Exception.build(Help.modbus.Exception.GatewayPathUnavailable)
		);
		assert.deepEqual(
			new Buffer([ 0x86, 0x0B ]),
			Help.modbus.WriteSingleRegister.Exception.build(Help.modbus.Exception.GatewayTargetDeviceFailedToRespond)
		);
	});

	it("should parse buffers with function code and exception", function () {
		assert.deepEqual(
			{ code: "ReadCoils", exception: "IllegalFunction" },
			Help.modbus.Exception.parse(new Buffer([ 0x81, 0x01 ]))
		);
		assert.deepEqual(
			{ code: "WriteSingleCoil", exception: "ServerDeviceFailure" },
			Help.modbus.Exception.parse(new Buffer([ 0x85, 0x04 ]))
		);
		assert.deepEqual(
			{ code: "WriteFileRecord", exception: "GatewayTargetDeviceFailedToRespond" },
			Help.modbus.Exception.parse(new Buffer([ 0x95, 0x0B ]))
		);
	});

	it("should support creating errors using just the string code", function () {
		assert.equal(
			Help.modbus.Exception.error("MemoryParityError").code,
			0x08
		);
		assert.equal(
			Help.modbus.Exception.error("GatewayPathUnavailable").code,
			0x0A
		);
	});

	it("should support creating errors using just the numeric code", function () {
		assert.equal(
			Help.modbus.Exception.error(0x08).message,
			"MemoryParityError"
		);
		assert.equal(
			Help.modbus.Exception.error(0x0A).message,
			"GatewayPathUnavailable"
		);
	});

	it("should support creating errors using an unknown code", function () {
		var err1 = Help.modbus.Exception.error(0xFA);
		var err2 = Help.modbus.Exception.error("An Error");

		assert.equal(err1.message, "250"); // 0xFA = 250
		assert.equal(err1.code, undefined);

		assert.equal(err2.message, "An Error");
		assert.equal(err2.code, undefined);
	});
});
