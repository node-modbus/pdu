var assert = require("assert");
var Help   = require("../help");

describe("Read Exception Status", function () {
	it("should be [] => [ data ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var data = Math.round(Math.random() * 100);

			assert.deepEqual(
				{},
				Help.modbus.ReadExceptionStatus.Request.parse(
					Help.modbus.ReadExceptionStatus.Request.build()
				)
			);
			assert.deepEqual(
				{ data: data },
				Help.modbus.ReadExceptionStatus.Response.parse(
					Help.modbus.ReadExceptionStatus.Response.build(data)
				)
			);
		}
	});
});
