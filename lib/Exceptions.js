var Modbus = require("./Modbus");

exports.ILLEGAL_FUNCTION                        = 0x01;
exports.ILLEGAL_DATA_ADDRESS                    = 0x02;
exports.ILLEGAL_DATA_VALUE                      = 0x03;
exports.SLAVE_DEVICE_FAILURE                    = 0x04;
exports.ACKNOWLEDGE                             = 0x05;
exports.SLAVE_DEVICE_BUSY                       = 0x06;
exports.NEGATIVE_ACKNOWLEDGE                    = 0x07;
exports.MEMORY_PARITY_ERROR                     = 0x08;
exports.GATEWAY_PATH_UNAVAILABLE                = 0x0A;
exports.GATEWAY_TARGET_DEVICE_FAILED_TO_RESPOND = 0x0B;

exports.load = function (functs) {
	for (var f in functs) {
		if (typeof functs[f] != "object" || !functs[f].hasOwnProperty("code")) continue;

		functs[f].exception = prepareException(f, functs[f]);
	}
};

exports.parse = function (buffer) {
	var data = {
		code      : buffer[0] & 0x7F,
		exception : buffer[1]
	};

	for (var k in Modbus) {
		if (typeof Modbus[k] == "object" && Modbus[k].code == data.code) {
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
			return new Buffer([ funct.code | 0x80, code ]);
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
