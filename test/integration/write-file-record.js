var assert = require("assert");
var Help   = require("../help");

describe("Write File Record", function () {
	it("should be [{ file, address }, ..] => [ data, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var req = [];
			var res = [];

			for (var j = 0; j < 10; j++) {
				var address = Math.round(Math.random() * 10);

				req.push({
					file    : Math.round(Math.random() * 10),
					address : address,
					values  : Help.randomBlockList(5, 2)
				});

				res.push({
					file    : Math.round(Math.random() * 10),
					address : address,
					values  : Help.randomBlockList(5, 2)
				});
			}

			assert.deepEqual(
				req,
				Help.modbus.WriteFileRecord.Request.parse(
					Help.modbus.WriteFileRecord.Request.build(req)
				)
			);
			assert.deepEqual(
				res,
				Help.modbus.WriteFileRecord.Response.parse(
					Help.modbus.WriteFileRecord.Response.build(res)
				)
			);
		}
	});
});
