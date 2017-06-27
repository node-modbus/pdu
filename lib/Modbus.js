var fs        = require("fs");
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
	var files = fs.readdirSync(path.resolve(__dirname, "protocol"));

	files.map(function (file) {
		if (file.substr(file.length - 3) !== ".js") return;

		var funct     = require("./protocol/" + file);
		var camelName = file[0].toUpperCase() + file.substr(1, file.length - 4).toLowerCase().replace(/_(\w)/g, function (m, c) {
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
