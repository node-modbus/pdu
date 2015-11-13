var assert = require("assert");
var Help   = require("../help");

describe("Parse Device Identification", function () {
	it("should be [ code, id ] => [ code, conformity, more, next, object, objext, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var code       = 0x01;
			var id         = 0x02;
			var conformity = 0x02;
			var objects    = [{
				id: 0, value: new Buffer("ThinkDigital") // company
			}, {
				id: 1, value: new Buffer("ModbusLib") // product
			}];

			assert.deepEqual(
				{ code : code, id : id },
				Help.modbus.ReadDeviceIdentification.Request.parse(
					Help.modbus.ReadDeviceIdentification.Request.build(code, id)
				)
			);
			assert.deepEqual(
				{ code: code, conformity: conformity, more: true, next: 2, objects: objects },
				Help.modbus.ReadDeviceIdentification.Response.parse(
					Help.modbus.ReadDeviceIdentification.Response.build(code, conformity, true, objects)
				)
			);
		}
	});
});
