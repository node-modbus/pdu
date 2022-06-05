var util      = require("util");
var path      = require("path");
var Exception = require("./Exception");
var Helpers   = require("./Helpers");
var Buff      = require("./Buffer");

load();

exports.Exception = Exception;
exports.Package   = function (fcode, data) {
	var buffer = Buff.alloc(data.length + 1);

	buffer.writeUInt8(fcode, 0);
	Buff.from(data).copy(buffer, 1);

	return buffer;
};

exports.Helpers = {
	blocksToBuffer : Helpers.blocksToBuffer,
	bitsToBuffer   : Helpers.bitsToBuffer,

	bufferToBlocks : Helpers.bufferToBlocks,
	bufferToBits   : Helpers.bufferToBits,
};

Exception.load(exports);

function load() {
	// List of request files in protocol subdir. 
	var files = [
		"GET_COMM_EVENT_COUNTER",
		"GET_COMM_EVENT_LOG",
		"MASK_WRITE_REGISTER",
		"READ_COILS",
		"READ_DEVICE_IDENTIFICATION",
		"READ_DISCRETE_INPUTS",
		"READ_EXCEPTION_STATUS",
		"READ_FIFO_QUEUE",
		"READ_FILE_RECORD",
		"READ_HOLDING_REGISTERS",
		"READ_INPUT_REGISTERS",
		"READ_WRITE_MULTIPLE_REGISTERS",
		"WRITE_FILE_RECORD",
		"WRITE_MULTIPLE_COILS",
		"WRITE_MULTIPLE_REGISTERS",
		"WRITE_SINGLE_COIL",
		"WRITE_SINGLE_REGISTER",
	];

	files.map(function (file) {
		var funct     = require("./protocol/" + file + ".js");
		var camelName = file[0].toUpperCase() + file.substr(1).toLowerCase().replace(/_(\w)/g, function (m, c) {
			return c.toUpperCase();
		});

		exports[camelName] = {
			Code     : funct.code,
			Request  : {
				build : proxy(funct, "buildRequest"),
				parse : function (buffer) {
					// byte 1 is function code
					return funct.parseRequest(buffer.slice(1));
				}
			},
			Response : {
				build : proxy(funct, "buildResponse"),
				parse : function (buffer) {
					// byte 1 is function code
					return funct.parseResponse(buffer.slice(1));
				}
			}
		};
	});

	exports.Request = function (buffer) {
		var code = buffer.readUInt8(0);

		for (var k in exports) {
			if (typeof exports[k] === "object" && exports[k].Code === code) {
				var data = exports[k].Request.parse(buffer);

				if (typeof data === "object" && !util.isArray(data) && data !== null) {
					data.code = k;
				} else {
					data = { code: k, data: data };
				}

				return data;
			}
		}

		return {
			code : buffer[0],
			data : buffer.slice(1)
		};
	};

	exports.Response = function (buffer) {
		var code = buffer.readUInt8(0);

		if (code & 0x80) {
			return Exception.parse(buffer);
		}

		for (var k in exports) {
			if (typeof exports[k] === "object" && exports[k].Code === code) {
				var data = exports[k].Response.parse(buffer);

				if (typeof data === "object" && !util.isArray(data) && data !== null) {
					data.code = k;
				} else {
					data = { code: k, data: data };
				}

				return data;
			}
		}

		return {
			code : buffer[0],
			data : buffer.slice(1)
		};
	};
}

function proxy(funct, method) {
	return function () {
		var stream = funct[method].apply(funct, arguments);
		var buffer = Buff.alloc(stream.length + 1);

		buffer[0] = funct.code;

		stream.copy(buffer, 1);

		return buffer;
	};
}
