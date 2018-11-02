var assert = require("assert");
var Help   = require("../help");

describe("Read File Record", function () {
	it("should be [{ file, address, length }, ..] => [ data, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var req   = [];
			var res   = [];
			var total = (10 + Math.round(Math.random() * 40));

			for (var j = 0; j < total; j++) {
				var address = Math.round(Math.random() * 10);

				req.push({
					file    : Math.round(Math.random() * 10),
					address : address,
					length  : Math.round(Math.random() * 10)
				});

				res.push(Help.randomBlockList(5, 2));
			}

			if (total > 36) {
				assert.throws(
					function () {
						Help.modbus.ReadFileRecord.Request.build(req);
					},
					/(out of bounds|RangeError)/
				);
			} else {
				assert.deepEqual(
					req,
					Help.modbus.ReadFileRecord.Request.parse(
						Help.modbus.ReadFileRecord.Request.build(req)
					)
				);
			}

			if (total > 21) {
				assert.throws(
					function () {
						Help.modbus.ReadFileRecord.Response.build(res);
					},
					/(out of bounds|RangeError)/
				);
			} else {
				assert.deepEqual(
					res,
					Help.modbus.ReadFileRecord.Response.parse(
						Help.modbus.ReadFileRecord.Response.build(res)
					)
				);
			}
		}
	});
});
