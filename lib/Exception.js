var Modbus = require("./Modbus");

exports.IllegalFunction                    = 0x01;
exports.IllegalDataAddress                 = 0x02;
exports.IllegalDataValue                   = 0x03;
exports.SlaveDeviceFailure                 = 0x04;
exports.SlaveDeviceBusy                    = 0x06;
exports.Aknowledge                         = 0x05;
exports.NegativeAknowledge                 = 0x07;
exports.MemoryParityError                  = 0x08;
exports.GatewayPathUnavailable             = 0x0A;
exports.GatewayTargetDeviceFailedToRespond = 0x0B;

exports.load = function (functs) {
	for (var f in functs) {
		if (typeof functs[f] != "object" || !functs[f].hasOwnProperty("Code")) continue;

		functs[f].Exception = prepareException(f, functs[f]);
	}
};

exports.parse = function (buffer) {
	var data = {
		code      : buffer[0] & 0x7F,
		exception : buffer[1]
	};

	for (var k in Modbus) {
		if (typeof Modbus[k] == "object" && Modbus[k].Code == data.code) {
			data.code = k;
			break;
		}
	}

	for (var k in exports) {
		if (exports[k] == data.exception) {
			data.exception = k;
			break;
		}
	}

	return data;
};

function prepareException(name, funct) {
	return {
		build: function (code) {
			return Buffer.from([ funct.Code | 0x80, code ]);
		},
		parse: function (buffer) {
			var exception = buffer[buffer.length - 1];

			for (var k in exports) {
				if (exports[k] == exception) {
					exception = k;
					break;
				}
			}

			return exception;
		}
	};
}
