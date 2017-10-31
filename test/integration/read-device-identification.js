var assert = require("assert");
var Help   = require("../help");

describe("Read Device Identification", function () {
	it("should be [ type, id ] => [ type, conformity, more, next, object, object, .. ]", function () {
		for (var i = 0; i < Help.trials; i++) {
			var type       = "BasicDeviceIdentification";
			var id         = "MajorMinorRevision";
			var objects    = [{
				id: "VendorName", value: new Buffer("ThinkDigital") // company
			}, {
				id: "ProductCode", value: new Buffer("modbus-pdu") // product
			}];

			assert.deepEqual(
				{ type : type, id : id },
				Help.modbus.ReadDeviceIdentification.Request.parse(
					Help.modbus.ReadDeviceIdentification.Request.build(type, id)
				)
			);
			assert.deepEqual(
				{ type: type, conformity: type, more: true, next: 11, objects: objects },
				Help.modbus.ReadDeviceIdentification.Response.parse(
					Help.modbus.ReadDeviceIdentification.Response.build(type, type, true, objects)
				)
			);
		}
	});
});
