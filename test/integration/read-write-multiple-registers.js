var assert = require("assert");
var Help   = require("../help");

describe("Read Write Multiple Registers", function () {
	it("should be [ read_address, read_quantity, write_address, values ] => [ values ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var read_address  = Math.round(Math.random() * 100);
			var read_quantity = 5;
			var write_address = Math.round(Math.random() * 100);
			var values        = Help.randomBlockList(read_quantity, 2);

			assert.deepEqual(
				{ read_address: read_address, read_quantity: read_quantity, write_address: write_address, values: values },
				Help.modbus.ReadWriteMultipleRegisters.Request.parse(
					Help.modbus.ReadWriteMultipleRegisters.Request.build(read_address, read_quantity, write_address, values)
				)
			);
			assert.deepEqual(
				{ values: values },
				Help.modbus.ReadWriteMultipleRegisters.Response.parse(
					Help.modbus.ReadWriteMultipleRegisters.Response.build(values)
				)
			);
		}
	});
});
