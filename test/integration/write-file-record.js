var assert = require("assert");
var Help   = require("../help");

describe("Write File Record", function () {
	it("should be [{ file, address }, ..] => [ data, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var req   = [];
			var res   = [];
			var total = (10 + Math.round(Math.random() * 40));

			for (var j = 0; j < total; j++) {
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

			if (total > 15) {
				assert.throws(
					function () {
						Help.modbus.WriteFileRecord.Request.build(req);
					},
					/(out of bounds|RangeError)/
				);
			} else {
				assert.deepEqual(
					req,
					Help.modbus.WriteFileRecord.Request.parse(
						Help.modbus.WriteFileRecord.Request.build(req)
					)
				);
			}

			if (total > 15) {
				assert.throws(
					function () {
						Help.modbus.WriteFileRecord.Request.build(req);
					},
					/(out of bounds|RangeError)/
				);
			} else {
				assert.deepEqual(
					res,
					Help.modbus.WriteFileRecord.Response.parse(
						Help.modbus.WriteFileRecord.Response.build(res)
					)
				);
			}
		}
	});
});
