var assert = require("assert");
var Help   = require("../help");

describe("Mask Write Register", function () {
	it("should be [ address, andmask, ormask ] => [ address, andmask, ormask ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address = Math.round(Math.random() * 100);
			var andmask = Help.randomBlock(2);
			var ormask  = Help.randomBlock(2);

			assert.deepEqual(
				{ address : address, andmask : andmask, ormask : ormask },
				Help.modbus.MaskWriteRegister.Request.parse(
					Help.modbus.MaskWriteRegister.Request.build(address, andmask, ormask)
				)
			);
			assert.deepEqual(
				{ address : address, andmask : andmask, ormask : ormask },
				Help.modbus.MaskWriteRegister.Response.parse(
					Help.modbus.MaskWriteRegister.Response.build(address, andmask, ormask)
				)
			);
		}
	});
});
