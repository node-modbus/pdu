var assert = require("assert");
var Help   = require("../help");

describe("Write Multiple Coils", function () {
	it("should be [ start, end, bits ] => [ start, end ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var start = Math.round(Math.random() * 100);
			var end   = start + 13 - 1;
			var bits  = Help.randomBitList(13);
			var buf1  = Help.modbus.writeMultipleCoils.request(start, end, bits);
			var buf2  = Help.startEndValues(Help.modbus.writeMultipleCoils.code, start, end, [ Help.bitsToBuffer(bits) ]);
			var buf3  = Help.modbus.writeMultipleCoils.response(start, end);

			assert.deepEqual(buf1, buf2);
			assert.deepEqual({ start : start, end : end }, Help.modbus.writeMultipleCoils.parse(buf3.slice(1)));
		}
	});
});
