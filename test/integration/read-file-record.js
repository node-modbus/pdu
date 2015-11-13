var assert = require("assert");
var Help   = require("../help");

describe("Read File Record", function () {
	it("should be [{ file, start, end }, ..] => [ data, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var req = [];
			var res = [];

			for (var j = 0; j < 10; j++) {
				var start = Math.round(Math.random() * 10);

				req.push({
					file  : Math.round(Math.random() * 10),
					start : start,
					end   : start + Math.round(Math.random() * 10)
				});

				res.push(Help.randomBlockList(5, 2));
			}

			assert.deepEqual(
				req,
				Help.modbus.readFileRecord.request.parse(
					Help.modbus.readFileRecord.request.build(req)
				)
			);
			assert.deepEqual(
				res,
				Help.modbus.readFileRecord.response.parse(
					Help.modbus.readFileRecord.response.build(res)
				)
			);
		}
	});
});
