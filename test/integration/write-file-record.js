var assert = require("assert");
var Help   = require("../help");

describe("Write File Record", function () {
	it("should be [{ file, start, end }, ..] => [ data, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var req = [];
			var res = [];

			for (var j = 0; j < 10; j++) {
				var start = Math.round(Math.random() * 10);
				var end   = start + 10 - 1;

				req.push({
					file   : Math.round(Math.random() * 10),
					start  : start,
					end    : end,
					values : Help.randomBlockList(5, 2)
				});

				res.push({
					file   : Math.round(Math.random() * 10),
					start  : start,
					end    : end,
					values : Help.randomBlockList(5, 2)
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