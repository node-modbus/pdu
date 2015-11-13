var Exceptions = require("./Exceptions");

load();

exports.Exceptions = Exceptions;

Exceptions.load(exports);

function load() {
	var files = require("fs").readdirSync(__dirname + "/protocol");

	files.map(function (file) {
		if (file.substr(file.length - 3) != ".js") return;

		var funct     = require("./protocol/" + file);
		var camelName = file.substr(0, file.length - 3).toLowerCase().replace(/_(\w)/g, function (m, c) {
			return c.toUpperCase();
		});

		exports[camelName] = {
			code     : funct.code,
			request  : {
				build : proxy(funct, "buildRequest"),
				parse : function (buffer) {
					// byte 1 is function code
					return funct.parseRequest(buffer.slice(1));
				}
			},
			response : {
				build : proxy(funct, "buildResponse"),
				parse : function (buffer) {
					// byte 1 is function code
					return funct.parseResponse(buffer.slice(1));
				}
			}
		};
	});
}

function proxy(funct, method) {
	return function () {
		var stream = funct[method].apply(funct, arguments);
		var buffer = new Buffer(stream.length + 1);

		buffer[0] = funct.code;

		stream.copy(buffer, 1);

		return buffer;
	};
}
