var assert = require("assert");
var Help   = require("../help");

describe("Get Comm Event Counter", function () {
	it("should be [] => [ status, event_count ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var status      = Math.round(Math.random() * 100);
			var event_count = Math.round(Math.random() * 100);

			assert.deepEqual(
				{},
				Help.modbus.GetCommEventCounter.Request.parse(
					Help.modbus.GetCommEventCounter.Request.build()
				)
			);
			assert.deepEqual(
				{ status: status, event_count: event_count },
				Help.modbus.GetCommEventCounter.Response.parse(
					Help.modbus.GetCommEventCounter.Response.build(status, event_count)
				)
			);
		}
	});
});
