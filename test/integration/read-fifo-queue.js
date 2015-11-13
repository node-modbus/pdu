var assert = require("assert");
var Help   = require("../help");

describe("Read FIFO Queue", function () {
	it("should be [ address ] => [ register, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var address = Math.round(Math.random() * 100);
			var blocks  = Help.randomBlockList(5, 2);

			assert.deepEqual(
				{ address: address },
				Help.modbus.ReadFifoQueue.Request.parse(
					Help.modbus.ReadFifoQueue.Request.build(address)
				)
			);
			assert.deepEqual(
				blocks,
				Help.modbus.ReadFifoQueue.Response.parse(
					Help.modbus.ReadFifoQueue.Response.build(blocks)
				)
			);
		}
	});
});
