var assert = require("assert");
var Help   = require("../help");

describe("Get Comm Event Log", function () {
	it("should be [] => [ status, event_count, message_count, events ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var status        = Math.round(Math.random() * 100);
			var event_count   = Math.round(Math.random() * 100);
			var message_count = Math.round(Math.random() * 100);
			var events        = Help.randomBlock(Math.random() * 4);

			assert.deepEqual(
				{},
				Help.modbus.GetCommEventLog.Request.parse(
					Help.modbus.GetCommEventLog.Request.build()
				)
			);
			assert.deepEqual(
				{ status: status, event_count: event_count, message_count: message_count, events: events },
				Help.modbus.GetCommEventLog.Response.parse(
					Help.modbus.GetCommEventLog.Response.build(status, event_count, message_count, events)
				)
			);
		}
	});
});
